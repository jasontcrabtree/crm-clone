using backend.Models;
using Microsoft.EntityFrameworkCore;

public interface IContactService
{
    Task<bool> ContactExists(string contactEmail);
    Task CreateContact(ContactModel contactModel);
    Task<IEnumerable<ContactModel>> GetAllContacts();
    Task<ContactModel?> GetContactById(int id);
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

    public async Task CreateContact(ContactModel contactModel)
    {
        var contact = new ContactModel
        {
            ContactFirstName = contactModel.ContactFirstName,
            ContactSurname = contactModel.ContactSurname,
            ContactEmail = contactModel.ContactEmail,
            ContactPhone = contactModel.ContactPhone,
            ContactNotes = contactModel.ContactNotes
        };

        _context.Contacts.Add(contact);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<ContactModel>> GetAllContacts()
    {
        return await _context.Contacts.ToListAsync();
    }

    public async Task<ContactModel?> GetContactById(int id)
    {
        return await _context.Contacts.FindAsync(id);
    }
}
