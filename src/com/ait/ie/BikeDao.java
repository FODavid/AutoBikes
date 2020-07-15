package com.ait.ie;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class BikeDao {
	
	public List<Bike> findAll(){
		List<Bike> list = new ArrayList<Bike>();
		Connection c = null;
		String sql = "SELECT * FROM bikes ORDER BY name";
		try {
			c = ConnectionHelper.getConnection();
			Statement s = c.createStatement();
			ResultSet rs = s.executeQuery(sql);
			while (rs.next()) {
				list.add(processRow(rs));
			}
			
		}catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
			
		} finally {
			ConnectionHelper.close(c);
			
		}
		return list;
		
		
	}
	
	protected Bike processRow(ResultSet rs) throws SQLException {
		Bike bike = new Bike ();
		bike.setId(rs.getInt("id"));
		bike.setName(rs.getString("name"));
		bike.setMake(rs.getString("make"));
		bike.setModel(rs.getString("model"));
		bike.setRegion(rs.getString("region"));
		bike.setColour(rs.getString("colour"));
		bike.setYear(rs.getString("year"));
		bike.setPrice(rs.getInt("price"));
		bike.setCountry(rs.getString("country"));
		bike.setPicture(rs.getString("picture"));
		bike.setSpecification(rs.getString("specification"));
		return bike;
				
	}
	
	
	public Bike findById(int id) throws SQLException {
		String sql = "SELECT * FROM bikes WHERE id =?";
		Bike bike = null;
		Connection c = null;
		try {
			c = ConnectionHelper.getConnection();
			PreparedStatement ps = c.prepareStatement(sql);
			ps.setInt(1, id);
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				bike = processRow(rs);
			}
		} catch (NumberFormatException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);

		}
		return bike;
	}

	public List<Bike> findByName(String name) {
		List<Bike> list = new ArrayList<Bike>();
		Connection c = null;
		String sql = "SELECT * FROM bikes as e WHERE UPPER(name) LIKE ? ORDER BY name";
		try {
			c = ConnectionHelper.getConnection();
			PreparedStatement ps = c.prepareStatement(sql);
			ps.setString(1, "%" + name.toUpperCase() + "%");
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				list.add(processRow(rs));
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
		return list;
	}

	// find by make and color
	public List<Bike> findByMakeAndColour(String make, String colour) {
		List<Bike> list = new ArrayList<Bike>();
		Connection c = null;
		String sql = "SELECT * FROM bikes WHERE UPPER(make) LIKE ? AND UPPER(colour) LIKE ? ORDER BY make";
		System.out.println(sql);
		try {
			c = ConnectionHelper.getConnection();
			PreparedStatement ps = c.prepareStatement(sql);
			ps.setString(1, "%" + make.toUpperCase() + "%");
			ps.setString(2, "%" + colour.toUpperCase() + "%");
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				list.add(processRow(rs));
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
		return list;
	}

	// create new bike (POST method)
	public Bike create(Bike bike) {
		Connection c = null;
		PreparedStatement ps = null;
		try {
			c = ConnectionHelper.getConnection();
			String sql = "INSERT into bikes "
					+ "(name, make, model, region, colour, year, price, country, picture, specification)"
					+ "VALUES(?,?,?,?,?,?,?,?,?,?)";
			System.out.println("SQL: " + sql);
			ps = c.prepareStatement(sql, new String[] { "ID" });
			ps.setString(1, bike.getName());
			ps.setString(2, bike.getMake());
			ps.setString(3, bike.getModel());
			ps.setString(4, bike.getRegion());
			ps.setString(5, bike.getColour());
			ps.setString(6, bike.getYear());
			ps.setInt(7, bike.getPrice());
			ps.setString(8, bike.getCountry());
			ps.setString(9, bike.getPicture());
			ps.setString(10, bike.getSpecification());
			ps.executeUpdate();
			ResultSet rs = ps.getGeneratedKeys();
			rs.next();
			int id = rs.getInt(1);
			bike.setId(id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
		return bike;
	}

	// update bike (PUT method)
	public Bike update(Bike bike) {
		Connection c = null;
		PreparedStatement ps = null;
		try {
			c = ConnectionHelper.getConnection();
			String sql = "UPDATE bikes SET name=?, make=?, model=?, region=?, colour=?, year=?, price=?, country=?, specification=? WHERE id=?";
			System.out.println("SQL: " + sql);
			ps = c.prepareStatement(sql, new String[] { "ID" });
			ps.setString(1, bike.getName());
			ps.setString(2, bike.getMake());
			ps.setString(3, bike.getModel());
			ps.setString(4, bike.getRegion());
			ps.setString(5, bike.getColour());
			ps.setString(6, bike.getYear());
			ps.setInt(7, bike.getPrice());
			ps.setString(8, bike.getCountry());
			ps.setString(9, bike.getSpecification());
			ps.setInt(10, bike.getId());
			ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
		return bike;
	}

	// delete bike (DELETE method)
	public boolean remove(int id) {
		Connection c = null;
		try {
			c = ConnectionHelper.getConnection();
			PreparedStatement ps = c.prepareStatement("DELETE FROM bikes WHERE id=?");
			ps.setInt(1, id);
			int count = ps.executeUpdate();
			return count == 1;
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
	}
	
	

}
