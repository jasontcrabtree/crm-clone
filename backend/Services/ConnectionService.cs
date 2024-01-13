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
}

public class ConnectionService : IConnectionService
{
    private readonly AppDbContext _context;

    public ConnectionService(AppDbContext context)
    {
        _context = context;
    }

    // public async Task<bool> ConnectionExists(string connectionEmail)
    // {
    //     return await _context.Connections.AnyAsync(u => u.Id == Id);
    // }

    public async Task<ConnectionModel> CreateConnection(ConnectionModel connectionModel)
    {
        var connection = new ConnectionModel
        {
            ConnectionLabel = connectionModel.ConnectionLabel,
            ConnectionType = connectionModel.ConnectionType,
            ContactModel = connectionModel.ContactModel,
            OrganisationModel = connectionModel.OrganisationModel,
            InteractionModel = connectionModel.InteractionModel
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
}
