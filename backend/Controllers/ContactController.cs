using Microsoft.AspNetCore.Mvc;
using backend.Models;

[ApiController]
[Route("api/contacts")]
public class ContactController : ControllerBase
{
    private readonly IContactService _contactService;

    public ContactController(IContactService contactService)
    {
        _contactService = contactService;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 20)
    {
        var contacts = await _contactService.GetAllContacts(pageNumber, pageSize);
        return Ok(new { data = contacts });
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] ContactModel model)
    {
        if (await _contactService.ContactExists(model.ContactEmail))
        {
            return BadRequest("Contact already exists.");
        }

        var createdContact = await _contactService.CreateContact(model);
        return CreatedAtAction(nameof(Get), new { id = createdContact.Id }, new
        {
            message = "Contact created successfully",
            data = createdContact
        });
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Get(int id)
    {
        var contact = await _contactService.GetContactById(id);

        if (contact == null)
        {
            return NotFound("Contact not found.");
        }
        return Ok(new { data = contact });

    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(int id, [FromBody] ContactModel model)
    {
        var updatedContact = await _contactService.UpdateContactById(id, model);
        if (updatedContact == null)
        {
            return NotFound("Contact not found.");
        }

        return Ok(new { message = "Contact updated successfully", data = updatedContact });
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id)
    {
        var contactExists = await _contactService.GetContactById(id);
        if (contactExists == null)
        {
            return NotFound("Contact not found.");
        }

        await _contactService.DeleteContactById(id);
        return NoContent();
    }
}