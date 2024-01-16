using backend.Models;
using Microsoft.EntityFrameworkCore;

public interface IOrganisationService
{
    Task<bool> OrganisationExists(string organisationName);
    Task<IEnumerable<OrganisationModel>> GetAllOrganisations(int userId, int pageNumber, int pageSize);
    Task<OrganisationModel> CreateOrganisation(OrganisationModel organisationModel, int userId);
    Task<OrganisationModel?> GetOrganisationById(int id, int userId);
    Task<OrganisationModel?> UpdateOrganisationById(int id, OrganisationModel organisationModel, int userId);
    Task DeleteOrganisationById(int id, int userId);
}

public class OrganisationService : IOrganisationService
{
    private readonly AppDbContext _context;

    public OrganisationService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<bool> OrganisationExists(string organisationEmail)
    {
        return await _context.Organisations.AnyAsync(u => u.OrganisationName == organisationEmail);
    }

    public async Task<OrganisationModel> CreateOrganisation(OrganisationModel organisationModel, int userId)
    {

        // First, ensure that the user with the given userId exists and is tracked.
        var user = await _context.Users.FindAsync(userId) ?? throw new Exception("User does not exist.");

        // var organisation = new OrganisationModel
        // {
        //     OrganisationName = organisationModel.OrganisationName,
        //     OrganisationAddress = organisationModel.OrganisationAddress,
        //     OrganisationCity = organisationModel.OrganisationCity,
        //     OrganisationCountry = organisationModel.OrganisationCountry,
        //     OrganisationNotes = organisationModel.OrganisationNotes,
        //     OrganisationPhone = organisationModel.OrganisationPhone,
        //     OrganisationWebsite = organisationModel.OrganisationWebsite
        // };

        organisationModel.UserId = user.Id;

        _context.Organisations.Add(organisationModel);
        await _context.SaveChangesAsync();

        return organisationModel;
    }

    public async Task<IEnumerable<OrganisationModel>> GetAllOrganisations(int userId, int pageNumber, int pageSize)
    {
        return await _context.Organisations
                    .Where(organisation => organisation.UserId == userId)
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();
    }

    public async Task<OrganisationModel?> GetOrganisationById(int id, int userId)
    {
        return await _context.Organisations.Where(c => c.Id == id && c.UserId == userId).FirstOrDefaultAsync();
    }
    public async Task<OrganisationModel?> UpdateOrganisationById(int id, OrganisationModel model, int userId)
    {
        var organisation = await _context.Organisations.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

        if (organisation == null)
        {
            return null;
        }

        organisation.OrganisationName = model.OrganisationName;
        organisation.OrganisationAddress = model.OrganisationAddress;
        organisation.OrganisationCity = model.OrganisationCity;
        organisation.OrganisationCountry = model.OrganisationCountry;
        organisation.OrganisationNotes = model.OrganisationNotes;
        organisation.OrganisationPhone = model.OrganisationPhone;
        organisation.OrganisationWebsite = model.OrganisationWebsite;

        await _context.SaveChangesAsync();
        return organisation;
    }

    public async Task DeleteOrganisationById(int id, int userId)
    {
        var organisation = await _context.Organisations.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);
        if (organisation != null)
        {
            _context.Organisations.Remove(organisation);
            await _context.SaveChangesAsync();
        }
    }

}
