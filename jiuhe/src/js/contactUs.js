	// 百度地图API功能
	var map = new BMap.Map("allmap");
	var point = new BMap.Point(113.6848052881,34.8027879692);
	map.centerAndZoom(point, 12);
	var marker = new BMap.Marker(point);  // 创建标注
  map.addOverlay(marker);              // 将标注添加到地图中
  map.enableScrollWheelZoom(true);