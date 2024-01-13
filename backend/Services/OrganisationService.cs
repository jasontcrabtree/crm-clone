using backend.Models;
using Microsoft.EntityFrameworkCore;

public interface IOrganisationService
{
    Task<bool> OrganisationExists(string organisationName);
    Task<IEnumerable<OrganisationModel>> GetAllOrganisations(int pageNumber, int pageSize);
    Task<OrganisationModel> CreateOrganisation(OrganisationModel organisationModel);
    Task<OrganisationModel?> GetOrganisationById(int id);
    Task<OrganisationModel?> UpdateOrganisationById(int id, OrganisationModel organisationModel);
    Task DeleteOrganisationById(int id);
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

    public async Task<OrganisationModel> CreateOrganisation(OrganisationModel organisationModel)
    {
        var organisation = new OrganisationModel
        {
            OrganisationName = organisationModel.OrganisationName,
            OrganisationAddress = organisationModel.OrganisationAddress,
            OrganisationCity = organisationModel.OrganisationCity,
            OrganisationCountry = organisationModel.OrganisationCountry,
            OrganisationNotes = organisationModel.OrganisationNotes,
            OrganisationPhone = organisationModel.OrganisationPhone,
            OrganisationWebsite = organisationModel.OrganisationWebsite
        };

        _context.Organisations.Add(organisation);
        await _context.SaveChangesAsync();

        return organisation;
    }

    public async Task<IEnumerable<OrganisationModel>> GetAllOrganisations(int pageNumber, int pageSize)
    {
        return await _context.Organisations
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();
    }

    public async Task<OrganisationModel?> GetOrganisationById(int id)
    {
        return await _context.Organisations.FindAsync(id);
    }
    public async Task<OrganisationModel?> UpdateOrganisationById(int id, OrganisationModel model)
    {
        var organisation = await _context.Organisations.FindAsync(id);
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

    public async Task DeleteOrganisationById(int id)
    {
        var organisation = await _context.Organisations.FindAsync(id);
        if (organisation != null)
        {
            _context.Organisations.Remove(organisation);
            await _context.SaveChangesAsync();
        }
    }
}
