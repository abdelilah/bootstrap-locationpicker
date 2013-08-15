/*
 *  Project: Location Picker
 *  Description: Places a button next to selected inputs to pick a location (based on Google Maps)
 *  Author: Abdelilah Sawab
 */

;(function ( $, window, undefined ) {
  var pluginName = 'locationPicker',
      document = window.document,
      defaults = {
        lngSelector: '#lng',
        lblSave: 'Use picked location',
        title: 'Select a location',
        placeholder: 'Type an address to search'
      };

  // The actual plugin constructor
  function Plugin( element, options ) {
    this.element = element;
    this.options = $.extend( {}, defaults, options) ;

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  Plugin.prototype.init = function () {
  		var opts = this.options;
		var me = $(this.element);
		var map;
		var geocoder;
		var marker;
		var selectedPos;

		var pickerButton = '<a href="#" class="btn location-picker-btn"><i class="icon-map-marker"></i></a>';
		me.after(pickerButton);

		// Make fields read only
		me.attr('readonly', 'readonly');
		$(this.options.lngSelector).attr('readonly', 'readonly');

		
		// Add modal
		var modal = '<div class="locationpicker-modal modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
			modal += '<div class="modal-header">';
				modal += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>';
				modal += '<h3 id="myModalLabel">'+this.options.title+'</h3>';
			modal += '</div>';

			modal += '<div class="modal-body">';
				modal += '<input type="text" class="input-block-level">';
				modal += '<div class="map-canvas"></div>';
			modal += '</div>';

			modal += '<div class="modal-footer">';
				modal += '<button class="btn btn-primary disabled">'+this.options.lblSave+'</button>';
			modal += '</div>';
		modal += '</div>';
		me.next().after(modal);


		// Init map
		var addMarker = function(pos){
			if(marker)
				marker.setMap(null);

			map.panTo(pos);
			marker = new google.maps.Marker({
			            map: map,
			            position: pos
			        });

			selectedPos = pos;

			$('.btn-primary', me.next().next()).removeClass('disabled');
		};

		

		var initMap = function(){
			geocoder = new google.maps.Geocoder();

			var mapOptions = {
			    zoom: 12,
			    center: new google.maps.LatLng(-34.397, 150.644),
			    mapTypeId: google.maps.MapTypeId.ROADMAP
			}
			map = new google.maps.Map($('.map-canvas', me.next().next())[0], mapOptions);

			google.maps.event.addListener(map, 'click', function(e) {
			    //map.setCenter(mark.getPosition());
			    //console.log(e);
			    addMarker(e.latLng);
			});

			if(me.val() != '' && me.val() != '0')
			{
				addMarker(new google.maps.LatLng(parseFloat(me.val()), parseFloat($(opts.lngSelector).val())));
			}

			$('.modal:visible .input-block-level').focus();
		};
		
		$('.btn-primary', me.next().next()).click(function (e) {
			e.preventDefault();

			me.val(selectedPos.lat());
			$(opts.lngSelector).val(selectedPos.lng());
			me.next().next().modal('hide');
		});


		$('.input-block-level', me.next().next()).keyup(function(){
			var address = $(this).val();
			if(address != '')
			{
				geocoder.geocode( { 'address': address}, function(results, status) {
			      if (status == google.maps.GeocoderStatus.OK) {
			      	addMarker(results[0].geometry.location);
			      }
			    });
			}
		}).keyup();

		$(me).next().click(function (e) {
			e.preventDefault();
			$(this).next().modal().on('shown', initMap);
		});
  };

  
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
      }
    });
  }

}(jQuery, window));