module.exports.convertValueToUpperCase = function(value) {
  value = value.split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' '); 
	return value;
}