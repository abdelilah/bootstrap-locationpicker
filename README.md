bootstrap-locationpicker
========================

A jQuery location picker plugin for Bootstrap.

This plugin will allow you to open a modal window and display a Google Map, pick a location by clicking the map, then bind selected point coordinates to 2 fields: latitude and longitude.


Requirements:
-------------

Before using the plugin you should have the following scripts included in your page:

- jQuery
- Bootstrap
- Google Maps


Usage:
-----

Here a sample HTML code:

	<label>Latitude:</label> <input type="text" id="lat"/> 
	<label>Longitude:</label> <input type="text" id="lng"/> 


and here is the Javascript:

	$(function(){
		$('#lat').locationPicker();
	});



Options:
--------


- lngSelector: Selecto for the longitude field,
- lblSave: Text to use for the save button,
- title: A title for the modal window,
- placeholder: Search field placeholder

these are the defaults:

	lngSelector: '#lng',
    lblSave: 'Use picked location',
    title: 'Select a location',
    placeholder: 'Type an address to search'
