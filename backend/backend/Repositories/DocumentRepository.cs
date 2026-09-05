using backend.Data;
using backend.Models;
using Dapper;
using Microsoft.AspNetCore.Hosting;

namespace backend.Repositories
{
    public class DocumentRepository : IDocumentRepository
    {
        private readonly DbConnectionFactory dbConnectionFactory;
        private readonly IWebHostEnvironment environment;

        public DocumentRepository(DbConnectionFactory dbConnectionFactory, IWebHostEnvironment environment)
        {
            this.dbConnectionFactory = dbConnectionFactory;
            this.environment = environment;
        }

        public async Task AddDocument(Document document)
        {
            using var connection = dbConnectionFactory.GetConnection();
            await connection.ExecuteAsync("insert into Document (ProductId, Name, DocumentType, Description, UrlOrFileReference, LastUpdatedDate) " +
               "values (@ProductId, @Name, @DocumentType, @Description, @UrlOrFileReference, @LastUpdatedDate)", document);
        }

        public async Task DeleteDocument(int id)
        {
            using var connection = dbConnectionFactory.GetConnection();
            await connection.ExecuteAsync("delete from Document where Id=@Id",
                new { Id = id });
        }

        public async Task<IEnumerable<Document>> GetAll()
        {
            using var connection = dbConnectionFactory.GetConnection();
            var documents = await connection.QueryAsync<Document>("select * from Document");
            return documents;
        }

        public async Task<Document> GetDocument(int id)
        {
            using var connection = dbConnectionFactory.GetConnection();
            var document = await connection.QueryFirstOrDefaultAsync<Document>("select * from Document where Id=@Id",
                new { Id = id });
            return document;
        }

        public async Task<Document> GetDocumentByProduct(int productId)
        {
            using var connection = dbConnectionFactory.GetConnection();
            var document = await connection.QueryFirstOrDefaultAsync<Document>("select * from Document where ProductId=@ProductId",
                new { ProductId = productId });
            return document;
        }

        public async Task<Document> GetDocumentByType(string type)
        {
            using var connection = dbConnectionFactory.GetConnection();
            var document = await connection.QueryFirstOrDefaultAsync<Document>("select * from Document where DocumentType=@DocumentType",
                new { DocumentType = type });
            return document;
        }

        public async Task UpdateDocument(Document document)
        {
            using var connection = dbConnectionFactory.GetConnection();
            await connection.ExecuteAsync("update Document set ProductId=@ProductId, Name=@Name, DocumentType=@DocumentType, Description=@Description, UrlOrFileReference=@UrlOrFileReference, LastUpdatedDate=@LastUpdatedDate " +
             "where Id=@Id", document);
        }

        public async Task<string> SaveFileAsync(Microsoft.AspNetCore.Http.IFormFile file)
        {
            var root = environment.WebRootPath ?? Path.Combine(environment.ContentRootPath, "wwwroot");
            var directory = Path.Combine(root, "uploads", "documents");
            Directory.CreateDirectory(directory);

            var safeName = Path.GetFileName(file.FileName);
            var uniqueName = $"{Guid.NewGuid():N}_{safeName}";
            var fullPath = Path.Combine(directory, uniqueName);

            await using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return $"/uploads/documents/{uniqueName}";
        }

        public void DeleteFile(string relativePath)
        {
            if (string.IsNullOrWhiteSpace(relativePath))
            {
                return;
            }

            var root = environment.WebRootPath ?? Path.Combine(environment.ContentRootPath, "wwwroot");
            var normalized = relativePath.Replace('/', Path.DirectorySeparatorChar).TrimStart(Path.DirectorySeparatorChar);

            if (normalized.StartsWith("uploads", StringComparison.OrdinalIgnoreCase) == false)
            {
                return;
            }

            var fullPath = Path.Combine(root, normalized);

            if (File.Exists(fullPath))
            {
                File.Delete(fullPath);
            }
        }
    }
}
