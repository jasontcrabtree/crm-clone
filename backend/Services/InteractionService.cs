using backend.Models;
using Microsoft.EntityFrameworkCore;

public interface IInteractionService
{
    Task<bool> InteractionExists(string interactionName);
    Task<IEnumerable<InteractionModel>> GetAllInteractions(int pageNumber, int pageSize);
    Task<InteractionModel> CreateInteraction(InteractionModel interactionModel);
    Task<InteractionModel?> GetInteractionById(int id);
    Task<InteractionModel?> UpdateInteractionById(int id, InteractionModel interactionModel);
    Task DeleteInteractionById(int id);
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

    public async Task<InteractionModel> CreateInteraction(InteractionModel interactionModel)
    {
        var interaction = new InteractionModel
        {
            InteractionTitle = interactionModel.InteractionTitle,
            InteractionNotes = interactionModel.InteractionNotes,
            InteractionDate = interactionModel.InteractionDate,
            InteractionType = interactionModel.InteractionType,
        };

        _context.Interactions.Add(interaction);
        await _context.SaveChangesAsync();

        return interaction;
    }

    public async Task<IEnumerable<InteractionModel>> GetAllInteractions(int pageNumber, int pageSize)
    {
        return await _context.Interactions
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();
    }

    public async Task<InteractionModel?> GetInteractionById(int id)
    {
        return await _context.Interactions.FindAsync(id);
    }
    public async Task<InteractionModel?> UpdateInteractionById(int id, InteractionModel model)
    {
        var interaction = await _context.Interactions.FindAsync(id);
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

    public async Task DeleteInteractionById(int id)
    {
        var interaction = await _context.Interactions.FindAsync(id);
        if (interaction != null)
        {
            _context.Interactions.Remove(interaction);
            await _context.SaveChangesAsync();
        }
    }

}
