"use client";

import { useEffect, useRef, useState } from "react";

type NaverMapWithGeocodingProps = {
  address: string;
  placeName?: string;
  mapUrl?: string;
  zoom?: number;
};

export default function NaverMapWithGeocoding({
  address,
  placeName,
  mapUrl,
  zoom = 16,
}: NaverMapWithGeocodingProps) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  // 주소를 좌표로 변환
  useEffect(() => {
    async function geocodeAddress() {
      try {
        const response = await fetch(`/api/geocode?q=${encodeURIComponent(address)}`);
        if (!response.ok) {
          throw new Error(`Geocoding failed: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.addresses && data.addresses.length > 0) {
          const { x, y } = data.addresses[0];
          setCoordinates({ lat: parseFloat(y), lng: parseFloat(x) });
        } else {
          setError("주소를 찾을 수 없습니다");
        }
      } catch (err) {
        console.error("Geocoding error:", err);
        setError("주소 변환 실패");
      }
    }

    geocodeAddress();
  }, [address]);

  // 좌표가 준비되면 지도 초기화
  useEffect(() => {
    if (!coordinates) return;

    setLoading(true);
    setError(null);

    const CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID;
    if (!CLIENT_ID) {
      setError("NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID가 설정되어 있지 않습니다.");
      setLoading(false);
      return;
    }

    // 인증 실패 감지
    (window as any).navermap_authFailure = () => {
      setError("네이버 지도 API 인증 실패");
      setLoading(false);
    };

    function initMap() {
      try {
        const naver = (window as any).naver;
        
        if (!naver || !naver.maps) {
          setError("네이버 지도 API 로드 실패");
          setLoading(false);
          return;
        }
        
        if (!elRef.current || !coordinates) {
          setError("지도를 초기화할 수 없습니다");
          setLoading(false);
          return;
        }

        elRef.current.innerHTML = "";

        const map = new naver.maps.Map(elRef.current, {
          center: new naver.maps.LatLng(coordinates.lat, coordinates.lng),
          zoom,
          minZoom: 6,
          zoomControl: true,
          zoomControlOptions: {
            position: naver.maps.Position.TOP_RIGHT,
            style: naver.maps.ZoomControlStyle.SMALL
          },
          mapTypeControl: false,
          scaleControl: false,
          logoControl: false,
        });

        // 지도 컨트롤의 z-index 조정
        const controls = elRef.current.querySelectorAll('.naver-map-control');
        controls.forEach((control: any) => {
          control.style.zIndex = '10';
        });

        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(coordinates.lat, coordinates.lng),
          map,
          title: placeName || address,
        });

        const infoContent = document.createElement("div");
        infoContent.style.padding = "8px 12px";
        infoContent.style.fontSize = "14px";
        infoContent.style.color = "#0b3d91";
        infoContent.style.fontWeight = "600";
        infoContent.innerHTML = `
          <div>${placeName || "위치"}</div>
          <div style="font-size: 12px; color: #666; margin-top: 4px;">${address}</div>
        `;

        const infoWindow = new naver.maps.InfoWindow({
          content: infoContent,
          backgroundColor: "rgba(255,255,255,0.95)",
          borderWidth: 0,
          anchorSize: new naver.maps.Size(10, 10),
        });

        // 마커 클릭 시 정보창 열기
        naver.maps.Event.addListener(marker, "click", () => {
          infoWindow.open(map, marker);
        });

        // 기본적으로 정보창 열기
        infoWindow.open(map, marker);

        setLoading(false);
      } catch (err: any) {
        console.error("initMap error:", err);
        setError(String(err?.message || err));
        setLoading(false);
      }
    }

    // 스크립트가 이미 로드되어 있는지 확인
    const existing = document.querySelector(`script[data-naver-maps]`);
    if (existing) {
      if ((window as any).naver && (window as any).naver.maps) {
        initMap();
      } else {
        existing.addEventListener("load", () => { initMap(); }, { once: true });
        existing.addEventListener("error", () => {
          setError("네이버 지도 스크립트 로드 오류");
          setLoading(false);
        }, { once: true });
      }
      return;
    }

    // 스크립트 생성
    const script = document.createElement("script");
    script.setAttribute("data-naver-maps", "1");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${CLIENT_ID}`;
    script.async = true;
    script.onload = () => {
      setTimeout(() => {
        if ((window as any).naver && (window as any).naver.maps) {
          initMap();
        } else {
          setError("네이버 지도 API 로드 실패");
          setLoading(false);
        }
      }, 100);
    };
    script.onerror = () => {
      setError("네이버 지도 스크립트 로드 실패");
      setLoading(false);
    };
    document.head.appendChild(script);

    return () => {
      if (elRef.current) elRef.current.innerHTML = "";
    };
  }, [coordinates, zoom, address, placeName]);

  return (
    <div className="w-full h-full min-h-[280px] relative" style={{ zIndex: 1 }}>
      <div ref={elRef} data-naver-map-container="true" className="w-full h-full relative" style={{ zIndex: 1 }} />

      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm">
          <div className="text-center">
            <div className="mb-2">지도를 불러오는 중입니다...</div>
            <div className="animate-spin inline-block w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full" />
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4 bg-white/90 backdrop-blur-sm">
          <div className="text-center max-w-sm">
            <div className="text-sm text-red-600 font-medium mb-2">지도 로드 오류</div>
            <div className="text-xs text-muted-foreground mb-3">{error}</div>
            {mapUrl ? (
              <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                <button className="px-3 py-2 bg-blue-600 text-white rounded">네이버 지도에서 보기</button>
              </a>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
