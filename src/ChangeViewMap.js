import React, { useState } from "react";
import { MapContainer as LeafletMap, TileLayer, useMap } from 'react-leaflet';



export function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}