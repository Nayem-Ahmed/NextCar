// get all services data
export const getServices = async () => {
    let data = await fetch('http://localhost:3000/services/api/get-all')
    let servicesData = await data.json();
    return servicesData;

}
// get servicesDetails data
export const getServicesDetails = async (id) => {
    let data = await fetch(`http://localhost:3000/services/api/${id}`)
    let service = await data.json();
    return service;

}
