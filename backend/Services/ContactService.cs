using backend.Models;
using Microsoft.EntityFrameworkCore;

public interface IContactService
{
    Task<bool> ContactExists(string contactEmail);
    Task<ContactModel> CreateContact(ContactModel contactModel, int userId);
    Task<ContactModel?> GetContactById(int id, int userId);
    Task<IEnumerable<ContactModel>> GetAllContacts(int userId, int pageNumber, int pageSize);
    Task<ContactModel?> UpdateContactById(int id, ContactModel model, int userId);
    Task DeleteContactById(int id, int userId);
}

public class ContactService : IContactService
{
    private readonly AppDbContext _context;

    public ContactService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<bool> ContactExists(string contactEmail)
    {
        return await _context.Contacts.AnyAsync(u => u.ContactEmail == contactEmail);
    }

    public async Task<ContactModel> CreateContact(ContactModel contactModel, int userId)
    {
        // First, ensure that the user with the given userId exists and is tracked.
        var user = await _context.Users.FindAsync(userId) ?? throw new Exception("User does not exist.");

        contactModel.UserId = user.Id;

        _context.Contacts.Add(contactModel);
        await _context.SaveChangesAsync();

        return contactModel;
    }

    public async Task<IEnumerable<ContactModel>> GetAllContacts(int UserId, int pageNumber, int pageSize)
    {
        return await _context.Contacts
                .Where(contact => contact.UserId == UserId)
                .OrderByDescending(c => c.Id)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
    }

    public async Task<ContactModel?> GetContactById(int id, int userId)
    {
        // return await _context.Contacts.FindAsync(id);
        return await _context.Contacts.Where(c => c.Id == id && c.UserId == userId).FirstOrDefaultAsync();
    }
    public async Task<ContactModel?> UpdateContactById(int id, ContactModel model, int userId)
    {
        var contact = await _context.Contacts.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);
        if (contact == null)
        {
            return null;
        }

        contact.ContactFirstName = model.ContactFirstName;
        contact.ContactSurname = model.ContactSurname;
        contact.ContactEmail = model.ContactEmail;
        contact.ContactPhone = model.ContactPhone;
        contact.ContactNotes = model.ContactNotes;

        await _context.SaveChangesAsync();
        return contact;
    }

    public async Task DeleteContactById(int id, int userId)
    {
        var contact = await _context.Contacts.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);
        if (contact != null)
        {
            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();
        }
    }
}
