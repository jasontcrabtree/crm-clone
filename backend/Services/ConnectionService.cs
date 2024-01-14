using backend.Models;
using Microsoft.EntityFrameworkCore;

public interface IConnectionService
{
    // Task<bool> ConnectionExists(string connectionName);
    Task<IEnumerable<ConnectionModel>> GetAllConnections(int pageNumber, int pageSize);
    Task<ConnectionModel> CreateConnection(ConnectionModel connectionModel);
    Task<ConnectionModel?> GetConnectionById(int id);
    Task<ConnectionModel?> UpdateConnectionById(int id, ConnectionModel connectionModel);
    Task DeleteConnectionById(int id);

    Task<IEnumerable<AggregateConnectionModel>> GetAllAggregateConnections(int pageNumber, int pageSize);
}

public class ConnectionService : IConnectionService
{
    private readonly AppDbContext _context;

    public ConnectionService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ConnectionModel> CreateConnection(ConnectionModel connectionModel)
    {
        // Check if the contact, organisation, and interaction exist
        if (connectionModel.ContactId.HasValue && !_context.Contacts.Any(c => c.Id == connectionModel.ContactId.Value))
        {
            throw new ArgumentException("Contact does not exist");
        }
        if (connectionModel.OrganisationId.HasValue && !_context.Organisations.Any(o => o.Id == connectionModel.OrganisationId.Value))
        {
            throw new ArgumentException("Organisation does not exist");
        }
        if (connectionModel.InteractionId.HasValue && !_context.Interactions.Any(i => i.Id == connectionModel.InteractionId.Value))
        {
            throw new ArgumentException("Interaction does not exist");
        }

        var connection = new ConnectionModel
        {
            ConnectionLabel = connectionModel.ConnectionLabel,
            ConnectionType = connectionModel.ConnectionType,
            ContactId = connectionModel.ContactId,
            OrganisationId = connectionModel.OrganisationId,
            InteractionId = connectionModel.InteractionId
        };

        _context.Connections.Add(connection);
        await _context.SaveChangesAsync();

        return connection;
    }

    public async Task<IEnumerable<ConnectionModel>> GetAllConnections(int pageNumber, int pageSize)
    {
        return await _context.Connections
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();
    }

    public async Task<ConnectionModel?> GetConnectionById(int id)
    {
        return await _context.Connections.FindAsync(id);
    }
    public async Task<ConnectionModel?> UpdateConnectionById(int id, ConnectionModel model)
    {
        var connection = await _context.Connections.FindAsync(id);
        if (connection == null)
        {
            return null;
        }

        connection.ConnectionLabel = model.ConnectionLabel;
        connection.ConnectionType = model.ConnectionType;
        connection.ContactModel = model.ContactModel;
        connection.OrganisationModel = model.OrganisationModel;
        connection.InteractionModel = model.InteractionModel;

        await _context.SaveChangesAsync();
        return connection;
    }

    public async Task DeleteConnectionById(int id)
    {
        var connection = await _context.Connections.FindAsync(id);
        if (connection != null)
        {
            _context.Connections.Remove(connection);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<AggregateConnectionModel>> GetAllAggregateConnections(int pageNumber, int pageSize)
    {
        return await _context.Connections
                    .Include(c => c.ContactModel)
                    .Include(c => c.OrganisationModel)
                    .Include(c => c.InteractionModel)
                    .Select(c => new AggregateConnectionModel
                    {
                        // Copy all base properties
                        Id = c.Id,
                        ConnectionLabel = c.ConnectionLabel,
                        ConnectionType = c.ConnectionType,
                        ContactId = c.ContactId,
                        OrganisationId = c.OrganisationId,
                        InteractionId = c.InteractionId,

                        // Include related data
                        ContactDetails = c.ContactModel,
                        OrganisationDetails = c.OrganisationModel,
                        InteractionDetails = c.InteractionModel
                    })
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();
    }
}
