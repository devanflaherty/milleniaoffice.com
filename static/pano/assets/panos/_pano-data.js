
PanoData = [];
var ind = 0;

PanoData[ind++] = {
	title : "Home",
	folder: "home",
	image : "home.jpg",
	sizeKB : 3500,
	mobileSize:850,
	initYaw : 0,
	hotspots: [
		["Courtyard", -50, -40],
		["Lobby", -34, -36],
		["Office", -43, -32],
		["Bridge<br>Connector", -58, -27],
		["Amenity Building", -47, -50],
		["Millenia Ave", -16, -68],
		["Discover", 10, -24],
		["Invent", 54, -58]
	]
}


PanoData[ind++] = {
	title : "Courtyard",
	folder: "Think",
	image : "think_courtyard.jpg",
	sizeKB : 5500,
	mobileSize:1500,
	initYaw : 180,
	map: [.5, .3],
	hotspots: [
		["Lobby", -160, 0],
		["Millenia Ave", -65, -3]
	]
}

PanoData[ind++] = {
	title : "Lobby",
	folder: "Think",
	image : "think_lobby.jpg",
	sizeKB : 3300,
	mobileSize:980,
	initYaw : 0,
	map: [.6, .34],
	hotspots: [
		["Courtyard", 180, 0],
		["Office", -110, 0]
	]
}

PanoData[ind++] = {
	title : "Office",
	folder: "Think",
	image : "think_office.jpg",
	sizeKB : 4500,
	mobileSize:1250,
	initYaw : 90,
	map: [.58, .28],
	hotspots: [
		["Lobby", 172, 0],
		["Bridge<br>Connector", 30, -2]
	]
}

PanoData[ind++] = {
	title : "Bridge<br>Connector",
	folder: "Think",
	image : "think_bridge.jpg",
	sizeKB : 3200,
	mobileSize:1000,
	initYaw : -90,
	map: [.57, .17],
	hotspots: [
		["Office", -35, 0],
		["Amenity Building", 30, -10]
	]
}

PanoData[ind++] = {
	title : "Amenity Building",
	folder: "Think",
	image : "think_amenity.jpg",
	sizeKB : 6100,
	mobileSize:1800,
	initYaw : 0,
	map: [.49, .37],
	hotspots: [
		["Bridge<br>Connector", -62, 8],
		["Discover ", 47, 3]
	]
}


PanoData[ind++] = {
	title : "Millenia Ave",
	folder: "Think",
	image : "millenia-ave.jpg",
	sizeKB : 3400,
	mobileSize:920,
	initYaw : 0,
	map: [.45, .45],
	hotspots: [
		["Courtyard", -10, 0]
	]
}

// This one has a space after Discover to make a distinction
// between the panorama to be used as a part of think tour (this one)
// and the discover pano that should be a part of Discover tour.

PanoData[ind++] = {
	title : "Discover ",
	folder: "Think",
	image : "discover.jpg",
	sizeKB : 3300,
	mobileSize:880,
	initYaw : -20,
	map: [.67, .51],
	hotspots: [
		["Amenity Building", -8, 2],
		["Finish Tour", -20, 25]
	]
}

/* ---------- Discover ---------- */
PanoData[ind++] = {
	title : "Discover",
	folder: "Discover",
	image : "discover.jpg",
	sizeKB : 3300,
	mobileSize:880,
	initYaw : 180,
	map: [.67, .51],
	hotspots: []
}


/* ---------- Invent ---------- */
PanoData[ind++] = {
	title : "Invent",
	folder: "Invent",
	image : "millenia-ave.jpg",
	sizeKB : 3400,
	mobileSize:920,
	initYaw : 0,
	map: [.45, .45],
	hotspots: []
}


