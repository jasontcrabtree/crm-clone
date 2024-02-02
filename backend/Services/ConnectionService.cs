using backend.Models;
using Microsoft.EntityFrameworkCore;

public interface IConnectionService
{
    // Task<bool> ConnectionExists(string connectionName);
    Task<IEnumerable<ConnectionModel>> GetAllConnections(int userId, int pageNumber, int pageSize);
    Task<ConnectionModel> CreateConnection(ConnectionModel connectionModel, int userId);
    Task<ConnectionModel?> GetConnectionById(int id, int userId);
    Task<ConnectionModel?> UpdateConnectionById(int id, ConnectionModel connectionModel, int userId);
    Task DeleteConnectionById(int id, int userId);

    Task<IEnumerable<AggregateConnectionModel>> GetAllAggregateConnections(int userId, int pageNumber, int pageSize);
}

public class ConnectionService : BaseService, IConnectionService
{
    private readonly AppDbContext _context;

    public ConnectionService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ConnectionModel> CreateConnection(ConnectionModel connectionModel, int UserId)
    {
        var user = await _context.Users.FindAsync(UserId) ?? throw new Exception("User does not exist.");

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

        connectionModel.UserId = user.Id;

        _context.Connections.Add(connectionModel);
        await _context.SaveChangesAsync();

        return connectionModel;
    }

    public async Task<IEnumerable<ConnectionModel>> GetAllConnections(int userId, int pageNumber, int pageSize)
    {
        return await _context.Connections
                    .Where(connection => connection.UserId == UserId)
                    .OrderByDescending(c => c.Id)
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();
    }

    public async Task<ConnectionModel?> GetConnectionById(int id, int userId)
    {
        return await _context.Connections.Where(c => c.Id == id && c.UserId == userId).FirstOrDefaultAsync();
    }

    public async Task<ConnectionModel?> UpdateConnectionById(int id, ConnectionModel model, int userId)
    {
        var connection = await _context.Connections.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

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

    public async Task DeleteConnectionById(int id, int userId)
    {
        var connection = await _context.Connections.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);
        if (connection != null)
        {
            _context.Connections.Remove(connection);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<AggregateConnectionModel>> GetAllAggregateConnections(int userId, int pageNumber, int pageSize)
    {
        return await _context.Connections
                    .Where(connection => connection.UserId == userId)
                    .OrderByDescending(c => c.Id)
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
