using backend.Models;
using Microsoft.EntityFrameworkCore;

public interface IContactService
{
    Task<bool> ContactExists(string contactEmail);
    Task<ContactModel> CreateContact(ContactModel contactModel);
    Task<ContactModel?> GetContactById(int id);
    Task<IEnumerable<ContactModel>> GetAllContacts(int pageNumber, int pageSize);
    Task<ContactModel?> UpdateContactById(int id, ContactModel model);
    Task DeleteContactById(int id);
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

    public async Task<ContactModel> CreateContact(ContactModel contactModel)
    {
        var contact = new ContactModel
        {
            // Assign properties from contactModel
            ContactFirstName = contactModel.ContactFirstName,
            ContactSurname = contactModel.ContactSurname,
            ContactEmail = contactModel.ContactEmail,
            ContactPhone = contactModel.ContactPhone,
            ContactNotes = contactModel.ContactNotes
        };

        _context.Contacts.Add(contact);
        await _context.SaveChangesAsync();

        return contact;
    }

    public async Task<IEnumerable<ContactModel>> GetAllContacts(int pageNumber, int pageSize)
    {
        return await _context.Contacts
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();
    }

    public async Task<ContactModel?> GetContactById(int id)
    {
        return await _context.Contacts.FindAsync(id);
    }
    public async Task<ContactModel?> UpdateContactById(int id, ContactModel model)
    {
        var contact = await _context.Contacts.FindAsync(id);
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

    public async Task DeleteContactById(int id)
    {
        var contact = await _context.Contacts.FindAsync(id);
        if (contact != null)
        {
            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();
        }
    }
}
