using backend.Models;

namespace backend.Services
{
    public interface IDepartmentService
    {
        Task<IEnumerable<Department>> GetAll();
        Task<Department> GetDepartment(int id);
        Task DeleteDepartment(int id);
        Task AddDepartment(Department department);
        Task UpdateDepartment(Department department);
    }
}
