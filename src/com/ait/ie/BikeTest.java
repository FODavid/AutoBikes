package com.ait.ie;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class BikeTest {

	private Bike bike;

	@BeforeEach
	void setUp() {

	    bike = new Bike();

		bike.setId(2);
		bike.setName("Boxer");
		bike.setMake("Honda");
		bike.setModel("6 Series");
		bike.setRegion("Athlone");
		bike.setColour("Green");
		bike.setYear("2020");
		bike.setPrice(1234);
		bike.setCountry("Ireland");
		bike.setSpecification("Durable");
	}

	@Test
	void testBikeID() {
		assertEquals(2, bike.getId());

	}

	@Test
	void testBikeName() {
		assertEquals("Boxer", bike.getName());
	}

	@Test
	void testBikeNameChange() {
		bike.setName("BraBus");
		assertEquals("BraBus", bike.getName());
	}

	@Test
	void testBikeMake() {
		assertEquals("Honda", bike.getMake());
	}

	@Test
	void testBikeModel() {
		assertEquals("6 Series", bike.getModel());
	}

	@Test
	void testBikeRegion() {
		assertEquals("Athlone", bike.getRegion());
	}

	@Test
	void testBikeColour() {
		assertEquals("Green", bike.getColour());
	}

	@Test
	void testBikeYear() {
		assertEquals("2020", bike.getYear());
	}

	@Test
	void testBikePrice() {
		assertEquals(1234, bike.getPrice());
	}

	@Test
	void testBikeCountry() {
		assertEquals("Ireland", bike.getCountry());

	}

	@Test
	void testBikeSpecification() {
		assertEquals("Durable", bike.getSpecification());
	}

}
