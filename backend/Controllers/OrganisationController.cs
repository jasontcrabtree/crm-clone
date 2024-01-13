using Microsoft.AspNetCore.Mvc;
using backend.Models;

[ApiController]
[Route("api/organisations")]

public class OrganisationController : ControllerBase
{
    private readonly IOrganisationService _organisationService;

    public OrganisationController(IOrganisationService organisationService)
    {
        _organisationService = organisationService;
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
            return BadRequest("Organisation already exists.");
        }

        var createdOrganisation = await _organisationService.CreateOrganisation(model);
        return CreatedAtAction(nameof(Get),
        new
        {
            id = createdOrganisation.Id
        },
            new
            {
                message = "Organisation created successfully",
                data = createdOrganisation
            });
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Get(int id)
    {
        var orgnisation = await _organisationService.GetOrganisationById(id);

        if (orgnisation == null)
        {
            return NotFound("Organisation not found.");
        }
        return Ok(new { data = orgnisation });

    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(int id, [FromBody] OrganisationModel model)
    {
        var updatedOrganisation = await _organisationService.UpdateOrganisationById(id, model);
        if (updatedOrganisation == null)
        {
            return NotFound("Organisation not found.");
        }

        return Ok(new { message = "Organisation updated successfully", data = updatedOrganisation });
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id)
    {
        var orgnisationExists = await _organisationService.GetOrganisationById(id);
        if (orgnisationExists == null)
        {
            return NotFound("Organisation not found.");
        }

        await _organisationService.DeleteOrganisationById(id);
        return NoContent();
    }
}