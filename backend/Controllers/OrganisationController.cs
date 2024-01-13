using Microsoft.AspNetCore.Mvc;
using backend.Models;

[ApiController]
[Route("api/organisation")]

public class OrganisationController : ControllerBase
{
    private readonly IOrganisationService _organisationService;

    public OrganisationController(IOrganisationService organisationService)
    {
        _organisationService = organisationService;
    }

    public List<PizzaFlavorDto> GetPizzaFlavorDtos()
    {
        var flavors = Enum.GetValues(typeof(PizzaFlavor)).Cast<PizzaFlavor>();
        var flavorDtos = flavors.Select(flavor => new PizzaFlavorDto
        {
            Flavor = flavor,
            Label = flavor.GetLabel()
        }).ToList();

        return flavorDtos;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 20)
    {
        var organisations = await _organisationService.GetAllOrganisations(pageNumber, pageSize);
        return Ok(new { data = organisations });
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] OrganisationModel model)
    {
        if (await _organisationService.OrganisationExists(model.OrganisationName))
        {
            return BadRequest("Contact already exists.");
        }

        var createdOrganisation = await _organisationService.CreateOrganisation(model);
        return CreatedAtAction(nameof(Get), new { id = createdOrganisation.Id }, new
        {
            message = "Contact created successfully",
            data = createdOrganisation
        });
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Get(int id)
    {
        var contact = await _organisationService.GetOrganisationById(id);

        if (contact == null)
        {
            return NotFound("Contact not found.");
        }
        return Ok(new { data = contact });

    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(int id, [FromBody] OrganisationModel model)
    {
        var updatedContact = await _organisationService.UpdateOrganisationById(id, model);
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
        var contactExists = await _organisationService.GetOrganisationById(id);
        if (contactExists == null)
        {
            return NotFound("Contact not found.");
        }

        await _organisationService.DeleteOrganisationById(id);
        return NoContent();
    }
}