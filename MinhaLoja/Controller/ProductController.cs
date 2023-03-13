using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MinhaLoja.Data;
using MinhaLoja.Models;
using MinhaLoja.ViewModels;
using System.Threading.Tasks;

namespace MinhaLoja.Controller
{
    [ApiController]
    [Route("v1")]
    public class ProductController : ControllerBase
    {
        [HttpGet]
        [Route("products")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> ListAsync([FromServices] AppDbContext context)
        {
            var products = await context.Products.ToListAsync();


            return products.Count <= 0? NotFound() : Ok(products);

        }

        [HttpGet]
        [Route("products/{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> GetAsync([FromServices] AppDbContext context, [FromRoute] int id)
        {
            var product = await context .Products.FirstOrDefaultAsync(p => p.Id == id);
            return product == null ? NotFound() : Ok(product);
        }

        [HttpPost("products")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<dynamic>> InsertAsync([FromServices] AppDbContext context, [FromBody] Product product)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            await context.Products.AddAsync(product);
            await context.SaveChangesAsync();
            return Created($"v1/products/{product.Id}", product);
        }

        [HttpPost("products/update")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<dynamic>> UpdateAsync([FromServices] AppDbContext context, [FromBody] Product product)
        {
            var prod = await context.Products.FirstOrDefaultAsync(p => p.Id == product.Id);
            prod.Name = product.Name;
            prod.Price = product.Price;
            prod.Stock = product.Stock;
            prod.Description = product.Description;
            context.Products.Update(prod);
            await context.SaveChangesAsync();
            return Created($"v1/products/{product.Id}", product);
        }

        [HttpPost("products/purchase")]
        [Authorize(Roles = "customer")]
        public async Task<ActionResult<dynamic>> PurchaseProductAsync([FromServices] AppDbContext context, [FromBody] PurchaseViewModel purchase )
        {
            var prod = await context.Products.FirstOrDefaultAsync(p => p.Id == purchase.ProductId);
            if (prod == null)
                return BadRequest();
            if (prod.Stock - purchase.Quantity < 0)
                return BadRequest();


            prod.Stock -= purchase.Quantity;
            context.Products.Update(prod);
            await context.SaveChangesAsync();
            return Created($"v1/products/{prod.Id}", prod);
        }





    }
}
