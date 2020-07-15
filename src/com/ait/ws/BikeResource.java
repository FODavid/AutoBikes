package com.ait.ws;

import java.sql.SQLException;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.ait.ie.Bike;
import com.ait.ie.BikeDao;

@Path("/bikes")
public class BikeResource {

	BikeDao dao = new BikeDao();

	@GET
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<Bike> findAll() {
		System.out.println("findAll");
		return dao.findAll();

	}

	@GET
	@Path("{id}")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Bike findById(@PathParam("id") String id) throws SQLException {
		System.out.println("findById" + id);
		return dao.findById(Integer.parseInt(id));
	}

	@Path("search/{query}")
	@GET
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<Bike> findByName(@PathParam("query") String query) {
		System.out.println("findByName: " + query);
		return dao.findByName(query);

	}

	@Path("/query")
	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<Bike> findByMakeAndColour(@QueryParam("make") String make, @QueryParam("colour") String colour) {
		System.out.println("findByMakeAndColour: " + make + colour);
		return dao.findByMakeAndColour(make, colour);
	}

	@POST
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Bike create(Bike bike) {
		System.out.println("Creating bike");
		return dao.create(bike);
	}

	@PUT
	@Path("{id}")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Bike update(Bike bike) {
		System.out.println("Updating bike: " + bike.getMake());
		dao.update(bike);
		return bike;
	}

	@DELETE
	@Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public void remove(@PathParam("id") int id) {
		dao.remove(id);
	}
}
