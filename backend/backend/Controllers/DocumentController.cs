using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocumentController : ControllerBase
    {
        private readonly IDocumentService service;

        public DocumentController(IDocumentService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var documents = await service.GetAll();
            return Ok(new { documents });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDocument(int id)
        {
            var document = await service.GetDocument(id);
            return Ok(new { document });
        }

        [HttpGet("product/{productId}")]
        public async Task<IActionResult> GetDocumentByProduct(int productId)
        {
            var document = await service.GetDocumentByProduct(productId);
            return Ok(new { document });
        }

        [HttpGet("type/{type}")]
        public async Task<IActionResult> GetDocumentByType(string type)
        {
            var document = service.GetDocumentByType(type);
            return Ok(new { document });
        }

        [HttpPost("Add")]
        public async Task<IActionResult> AddDocument(Document document)
        {
            await service.AddDocument(document);
            return Ok();
        }

        [HttpPost("Upload")]
        public async Task<IActionResult> UploadDocument([FromForm] DocumentUploadRequest request)
        {
            var document = new Document
            {
                ProductId = request.ProductId,
                Name = request.Name,
                DocumentType = request.DocumentType,
                Description = request.Description,
                LastUpdatedDate = request.LastUpdatedDate,
            };

            if (request.File != null && request.File.Length > 0)
            {
                document.UrlOrFileReference = await service.SaveFileAsync(request.File);
            }

            await service.AddDocument(document);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDocument(int id)
        {
            await service.DeleteDocument(id);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDocument(int id, Document document)
        {
            document.Id = id;
            await service.UpdateDocument(document);
            return Ok();
        }

        [HttpPut("Upload/{id}")]
        public async Task<IActionResult> UpdateDocumentUpload(int id, [FromForm] DocumentUploadRequest request)
        {
            var existing = await service.GetDocument(id);

            var document = new Document
            {
                Id = id,
                ProductId = request.ProductId,
                Name = request.Name,
                DocumentType = request.DocumentType,
                Description = request.Description,
                LastUpdatedDate = request.LastUpdatedDate,
                UrlOrFileReference = existing.UrlOrFileReference,
            };

            if (request.File != null && request.File.Length > 0)
            {
                var newReference = await service.SaveFileAsync(request.File);

                if (!string.IsNullOrWhiteSpace(existing.UrlOrFileReference))
                {
                    service.DeleteFile(existing.UrlOrFileReference);
                }

                document.UrlOrFileReference = newReference;
            }

            await service.UpdateDocument(document);
            return Ok();
        }

    }
}
