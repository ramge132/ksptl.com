"use client";

import { useEffect, useRef, useState } from "react";

type NaverMapProps = {
  lat: number;
  lng: number;
  placeName?: string;
  mapUrl?: string;
  zoom?: number;
};

export default function NaverMap({
  lat,
  lng,
  placeName,
  mapUrl,
  zoom = 15,
}: NaverMapProps) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID;
    if (!CLIENT_ID) {
      setError("NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID가 설정되어 있지 않습니다.");
      setLoading(false);
      console.warn("NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID is not defined.");
      return;
    }

    // 인증 실패 감지 함수 설정
    (window as any).navermap_authFailure = () => {
      setError("네이버 지도 API 인증 실패 - 클라이언트 ID를 확인하세요");
      setLoading(false);
    };

    // init map when library available
    function initMap() {
      try {
        // @ts-ignore
        const naver = (window as any).naver;
        
        // naver.maps가 없으면 에러
        if (!naver || !naver.maps) {
          setError("naver.maps 로드 실패 - 스크립트가 정상적으로 로드되지 않았습니다");
          setLoading(false);
          return;
        }
        
        // 컨테이너가 없으면 에러
        if (!elRef.current) {
          setError("지도 컨테이너를 찾을 수 없습니다");
          setLoading(false);
          return;
        }

        // clear previous children
        elRef.current.innerHTML = "";

        const map = new naver.maps.Map(elRef.current, {
          center: new naver.maps.LatLng(lat, lng),
          zoom,
          minZoom: 6,  // 네이버 지도 API 요구사항: 최소 6 이상
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          logoControl: false,
        });

        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(lat, lng),
          map,
          title: placeName || "",
        });

        const infoContent = document.createElement("div");
        infoContent.style.padding = "8px 12px";
        infoContent.style.fontSize = "14px";
        infoContent.style.color = "#0b3d91";
        infoContent.style.fontWeight = "600";
        infoContent.textContent = placeName || "위치";

        const infoWindow = new naver.maps.InfoWindow({
          content: infoContent,
          backgroundColor: "rgba(255,255,255,0.95)",
          borderWidth: 0,
          anchorSize: new naver.maps.Size(10, 10),
        });

        naver.maps.Event.addListener(marker, "click", () => {
          infoWindow.open(map, marker);
        });

        setLoading(false);
      } catch (err: any) {
        console.error("initMap error:", err);
        setError(String(err?.message || err));
        setLoading(false);
      }
    }

    // If script already present, try init
    const existing = document.querySelector(`script[data-naver-maps]`);
    if (existing) {
      if ((window as any).naver && (window as any).naver.maps) {
        initMap();
      } else {
        existing.addEventListener(
          "load",
          () => {
            initMap();
          },
          { once: true }
        );
        existing.addEventListener(
          "error",
          () => {
            setError("네이버 지도 스크립트 로드 오류");
            setLoading(false);
          },
          { once: true }
        );
      }
      return;
    }

    // create script - 신규 Maps API 형식 사용
    const script = document.createElement("script");
    script.setAttribute("data-naver-maps", "1");
    // 기존: openapi.map.naver.com + ncpClientId
    // 신규: oapi.map.naver.com + ncpKeyId
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${CLIENT_ID}`;
    script.async = true;
    script.onload = () => {
      // 스크립트 로드 후 약간의 딜레이를 주고 초기화
      setTimeout(() => {
        if ((window as any).naver && (window as any).naver.maps) {
          initMap();
        } else {
          setError("네이버 지도 API가 정상적으로 로드되지 않았습니다. 콘솔을 확인해주세요.");
          setLoading(false);
        }
      }, 100);
    };
    script.onerror = (e) => {
      console.error("naver maps script error", e);
      setError("네이버 지도 스크립트 로드 실패");
      setLoading(false);
    };
    document.head.appendChild(script);

    return () => {
      // do not remove script to avoid reloading repeatedly; clear map container if present
      if (elRef.current) elRef.current.innerHTML = "";
    };
    // intentionally exclude lat/lng from deps to avoid re-creating script; re-init on props change by full remount if needed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  return (
    <div className="w-full h-full min-h-[280px] relative">
      {/* 지도 컨테이너는 항상 렌더링 (스크립트가 붙을 대상 유지) */}
      <div ref={elRef} data-naver-map-container="true" className="w-full h-full" />

      {/* 로딩 오버레이 */}
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm">
          <div className="text-center">
            <div className="mb-2">지도를 불러오는 중입니다...</div>
            <div className="animate-spin inline-block w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full" />
          </div>
        </div>
      )}

      {/* 에러 오버레이 */}
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
