import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../axios/axios";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface VideoType {
  _id: string;
  title: string;
  description: string;
  genre: string;
  thumbnail: string;
  videoUrl: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedIn: boolean;
  loading: boolean;
  checkUser: () => Promise<void>;

  // Videos
  videos: VideoType[];
  setVideos: React.Dispatch<React.SetStateAction<VideoType[]>>;
  videoLoading: boolean;
  setVideoLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [videoLoading, setVideoLoading] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(true); // auth loading
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Fetch videos once and expose setter so other components can refresh
  useEffect(() => {
    let isMounted = true;

    const fetchVideos = async () => {
      try {
        const res = await API.get("/videos/feed");
        // Adjust this according to your API shape: res.data.video or res.data.videos
        const payload = res.data.video ?? res.data.videos ?? res.data;
        if (isMounted) {
          setVideos(Array.isArray(payload) ? payload : []);
          setVideoLoading(false);
        }
      } catch (err) {
        console.error("Error fetching videos", err);
        if (isMounted) setVideoLoading(false);
      }
    };

    fetchVideos();

    return () => {
      isMounted = false;
    };
  }, []);

  // Check if token cookie is valid (auto login)
  const checkUser = async () => {
    try {
      const res = await API.get("/auth/profile", {
        withCredentials: true,
      });
      // If your backend returns user under res.data.user:
      const foundUser = res.data?.user ?? null;
      setUser(foundUser);
      setIsLoggedIn(!!foundUser);
    } catch (err) {
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        loading,
        checkUser,

        videos,
        setVideos,
        videoLoading,
        setVideoLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Easy hook
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
