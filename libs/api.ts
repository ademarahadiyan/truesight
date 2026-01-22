export const api = {
  get: async <T>(url: string): Promise<T> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
      method: "GET",
    });

    if (!res.ok) throw await res.json();
    return res.json();
  },

  post: async <T>(url: string, body?: any): Promise<T> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
      headers: body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" },
    });

    if (!res.ok) throw await res.json();
    return res.json();
  },

  // Video Analysis (MesoNet)
  uploadVideo: async <T>(file: File): Promise<T> => {
    const formData = new FormData();
    formData.append("file", file);

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const fullUrl = `${baseUrl}/upload`;

    console.log("📤 Uploading Video:", fullUrl);
    console.log("   File:", file.name, file.type, file.size);

    try {
      const res = await fetch(fullUrl, {
        method: "POST",
        body: formData,
      });

      console.log("📥 Response status:", res.status);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
        console.error("❌ API Error:", errorData);
        throw errorData;
      }

      const data: T = await res.json();
      console.log("✅ Video Analysis Response:", data);
      return data;
    } catch (error) {
      console.error("❌ Video Upload Error:", error);
      throw error;
    }
  },

  // Audio Analysis (AASIST)
  uploadAudio: async <T>(file: File): Promise<T> => {
    const formData = new FormData();
    formData.append("file", file);

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const fullUrl = `${baseUrl}/audio`;

    console.log("📤 Uploading Audio:", fullUrl);
    console.log("   File:", file.name, file.type, file.size);

    try {
      const res = await fetch(fullUrl, {
        method: "POST",
        body: formData,
      });

      console.log("📥 Response status:", res.status);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
        console.error("❌ API Error:", errorData);
        throw errorData;
      }

      const data: T = await res.json();
      console.log("✅ Audio Analysis Response:", data);
      return data;
    } catch (error) {
      console.error("❌ Audio Upload Error:", error);
      throw error;
    }
  },

  // Metadata Extraction (untuk Image/Video/Audio)
  extractMetadata: async <T>(file: File): Promise<T> => {
    const formData = new FormData();
    formData.append("file", file);

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const fullUrl = `${baseUrl}/metadata`;

    console.log("📤 Extracting Metadata:", fullUrl);
    console.log("   File:", file.name, file.type, file.size);

    try {
      const res = await (fullUrl, {{
        method: "POST",
        body: formData,
      });

      console.log("📥 Response status:", res.status);

      // Baca response sebagai text
      const responseText = await res.text();
      console.log("📥 Raw response text:", responseText);

      // Parse JSON
      let data: T;
      try {
        data = JSON.parse(responseText);
        console.log("📥 Parsed JSON complete:", JSON.stringify(data, null, 2));
      } catch (parseError) {
        console.error("❌ JSON Parse Error:", parseError);
        throw { error: `Invalid JSON response: ${responseText}` };
      }

      // ⭐ LOG semua field di response
      console.log("📥 Response structure:", {
        has_error: "error" in (data as any),
        has_ffprobe: "ffprobe" in (data as any),
        has_sha256: "sha256" in (data as any),
        has_filename: "filename" in (data as any),
        all_keys: Object.keys(data as any),
      });

      // ⭐ JIKA ada field "error" DAN tidak ada "ffprobe", baru throw error
      if ("error" in (data as any) && !("ffprobe" in (data as any))) {
        const errorMsg = (data as any).error;
        console.error("❌ Backend error:", errorMsg);
        throw { error: errorMsg };
      }

      // ⭐ JIKA ada "ffprobe", berarti SUCCESS (ignore error field kalau ada)
      if ("ffprobe" in (data as any)) {
        console.log("✅ Metadata extracted successfully!");
        console.log("   FFprobe data:", (data as any).ffprobe);
        console.log("   SHA256:", (data as any).sha256);
        return data;
      }

      // ⭐ Fallback: kalau response bukan error dan bukan ffprobe, return apa adanya
      console.log("✅ Response SUCCESS:", data);
      return data;
    } catch (error) {
      console.error("❌ Metadata Extraction Error:", error);
      throw error;
    }
  },

  // OSINT Domain/URL Analysis
  analyzeOsint: async <T>(domain: string): Promise<T> => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const fullUrl = `${baseUrl}/osint`;

    console.log("📤 Analyzing Domain/URL:", fullUrl);
    console.log("   Domain:", domain);

    try {
      // Gunakan URLSearchParams bukan FormData untuk OSINT
      const params = new URLSearchParams();
      params.append("domain", domain);

      const res = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      console.log("📥 Response status:", res.status);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
        console.error("❌ API Error:", errorData);
        throw errorData;
      }

      const data: T = await res.json();
      console.log("✅ OSINT Response:", data);
      return data;
    } catch (error) {
      console.error("❌ OSINT Analysis Error:", error);
      throw error;
    }
  },

  // Health Check
  healthCheck: async <T>(): Promise<T> => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const fullUrl = `${baseUrl}/health`;

    console.log("🏥 Health Check:", fullUrl);

    try {
      const res = await fetch(fullUrl, {
        method: "GET",
      });

      console.log("📥 Response status:", res.status);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
        console.error("❌ Health Check Error:", errorData);
        throw errorData;
      }

      const data: T = await res.json();
      console.log("✅ Health Check Response:", data);
      return data;
    } catch (error) {
      console.error("❌ Health Check Error:", error);
      throw error;
    }
  },

  // Legacy analyzeMedia (untuk backward compatibility)
  analyzeMedia: async <T>(
    endpoint: "video-analyze" | "audio-analyze" | "link",
    file?: File,
    domain?: string
  ): Promise<T> => {
    // Map old endpoints ke new endpoints
    if (endpoint === "video-analyze") {
      return api.uploadVideo<T>(file!);
    } else if (endpoint === "audio-analyze") {
      return api.uploadAudio<T>(file!);
    } else if (endpoint === "link") {
      return api.analyzeOsint<T>(domain!);
    }

    throw new Error("Unknown endpoint: " + endpoint);
  },
};

// ...existing code...
interface MetadataAnalysisResult {
  ffprobe?: any;
  sha256?: string;
  // added optional detector fields for images
  image_score?: number; // 0..1
  status?: string;
  filename?: string;
}
// ...existing code...