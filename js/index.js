new Vue({
	el:"#app",
	data: {
		lat: 0,
		long: 0,
		location: "Loading city ...",
		temp: 0,
		cond: 0,
		weather: "",
		apiUrl: 'http://api.openweathermap.org/data/2.5/weather',
		apiId: '05c210949399cdb6569379f52aa8668c',
		isMetricUnit: true
	},
	ready: function(){
		this.loadData(this.isMetricUnit);
	},
	methods: {
		getLocation: function(done){
			var that = this;
			if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(pos){
					that.lat = pos.coords.latitude;
					that.long = pos.coords.longitude;
					return done();
				});
			}
		},
		getWeather: function(lat, long) {
			var that = this,
				unit = that.isMetricUnit ? 'metric' : 'imperial';

			jQuery.getJSON(that.apiUrl, {
				lat: that.lat,
				lon: that.long,
				appid: that.apiId,
				units: unit
			}, function(data){
				that.location = data.name + ", " + data.sys.country;
				that.temp = data.main.temp;
				that.temp += that.isMetricUnit ? "°C" : "°F";
				that.weather = data.weather[0].main + " - " + data.weather[0].description;
				that.cond = data.weather[0].id;
			});
		},
		loadData: function(unit){
			var that = this;
			that.isMetricUnit = unit;
			that.getLocation(function(){
				that.getWeather(that.lat, that.long);
			});
		}
	}
});