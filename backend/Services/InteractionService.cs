using backend.Models;
using Microsoft.EntityFrameworkCore;

public interface IInteractionService
{
    Task<bool> InteractionExists(string interactionName);
    Task<(IEnumerable<InteractionModel>, int)> GetAllInteractions(int userId, int pageNumber, int pageSize);
    Task<InteractionModel> CreateInteraction(InteractionModel interactionModel, int userId);
    Task<InteractionModel?> GetInteractionById(int id, int userId);
    Task<InteractionModel?> UpdateInteractionById(int id, InteractionModel interactionModel, int userId);
    Task DeleteInteractionById(int id, int userId);
    Task<IEnumerable<InteractionModel>> GetUserInteractionsForEntityAsync(string entityType, int entityId, int userId);
    Task<IEnumerable<InteractionModel>> GetUserInteractionsForEntityTypeAsync(string entityType, int userId);

    // Task<IEnumerable<InteractionModel>> GetAllUserInteractionsAsync(int userId);
}

public class InteractionService : IInteractionService
{
    private readonly AppDbContext _context;

    public InteractionService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<bool> InteractionExists(string interactionEmail)
    {
        return await _context.Interactions.AnyAsync(u => u.InteractionTitle == interactionEmail);
    }

    public async Task<InteractionModel> CreateInteraction(InteractionModel interactionModel, int userId)
    {
        // First, ensure that the user with the given userId exists and is tracked.
        var user = await _context.Users.FindAsync(userId) ?? throw new Exception("User does not exist.");

        interactionModel.UserId = user.Id;

        _context.Interactions.Add(interactionModel);
        await _context.SaveChangesAsync();

        return interactionModel;
    }

    public async Task<(IEnumerable<InteractionModel>, int)> GetAllInteractions(int userId, int pageNumber, int pageSize)
    {
        // return await _context.Interactions
        //     .Where(i => i.UserId == userId)
        //     .OrderByDescending(i => i.InteractionDate)
        //     .Skip((pageNumber - 1) * pageSize)
        //     .Take(pageSize)
        //     .ToListAsync();
        var query = _context.Interactions.Where(contact => contact.UserId == userId);

        int totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(c => c.Id)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, totalCount);
    }

    public async Task<InteractionModel?> GetInteractionById(int id, int userId)
    {
        return await _context.Interactions.Where(c => c.Id == id && c.UserId == userId).FirstOrDefaultAsync();
    }
    public async Task<InteractionModel?> UpdateInteractionById(int id, InteractionModel model, int userId)
    {
        var interaction = await _context.Interactions.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);
        if (interaction == null)
        {
            return null;
        }

        interaction.InteractionTitle = model.InteractionTitle;
        interaction.InteractionDate = model.InteractionDate;
        interaction.InteractionType = model.InteractionType;
        interaction.InteractionNotes = model.InteractionNotes;

        await _context.SaveChangesAsync();
        return interaction;
    }

    public async Task DeleteInteractionById(int id, int userId)
    {
        var interaction = await _context.Interactions.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

        if (interaction != null)
        {
            _context.Interactions.Remove(interaction);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<InteractionModel>> GetUserInteractionsForEntityAsync(string entityType, int entityId, int userId)
    {
        return await _context.Interactions
             .Where(i => i.EntityType.Equals(entityType)
                         && i.EntityId == entityId
                         && i.UserId == userId)
             .ToListAsync();
    }

    public async Task<IEnumerable<InteractionModel>> GetUserInteractionsForEntityTypeAsync(string entityType, int userId)
    {
        return await _context.Interactions
             .Where(i => i.EntityType.Equals(entityType)
                         && i.UserId == userId)
             .ToListAsync();
    }

    // public async Task<IEnumerable<InteractionModel>> GetAllUserInteractionsAsync(int userId)
    // {
    //     return await _context.Interactions
    //         .Where(i => i.UserId == userId)
    //         .ToListAsync();
    // }
}
