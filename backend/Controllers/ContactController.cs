using Microsoft.AspNetCore.Mvc;
using backend.Models;

[ApiController]
[Route("api/contact")]
public class ContactController : ControllerBase
{
    private readonly IContactService _contactService;

    public ContactController(IContactService contactService)
    {
        _contactService = contactService;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll()
    {
        var contacts = await _contactService.GetAllContacts();
        return Ok(new { data = contacts });
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

    [HttpPost("create")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] ContactModel model)
    {
        if (await _contactService.ContactExists(model.ContactEmail))
        {
            return BadRequest("Contact already exists.");
        }

        await _contactService.CreateContact(model);
        return Ok(new { message = "Contact created successfully" });
    }
}
