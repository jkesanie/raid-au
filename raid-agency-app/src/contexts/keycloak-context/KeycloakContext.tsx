import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { keycloakInstance } from "../../keycloak";

interface LoginOptions {
  idpHint?: string;
  scope?: string;
  redirectUri?: string;
  // Add other options you might need
}

type KeycloakUser = {
  id?: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  roles?: string[];
};

interface KeycloakContextType {
  isInitialized: boolean;
  isLoading: boolean;
  user: KeycloakUser | null;
  authenticated?: boolean;
  login: (options?: LoginOptions) => Promise<void>;
  logout: () => Promise<void>;
  token?: string;
  tokenParsed?: Record<string, string>;
  refreshToken?: string;
  updateToken: (minValidity: number) => Promise<boolean>;
}

const KeycloakContext = createContext<KeycloakContextType | undefined>(
  undefined
);

export function KeycloakProvider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<KeycloakUser | null>(null);

  const login = async (options?: LoginOptions) => {
    try {
      await keycloakInstance.login({
        idpHint: options?.idpHint,
        scope: options?.scope,
        redirectUri: options?.redirectUri || window.location.origin,
      });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const value: KeycloakContextType = {
    isInitialized,
    isLoading,
    user,
    authenticated: keycloakInstance.authenticated,
    login,
    logout: keycloakInstance.logout,
    token: keycloakInstance.token || "",
    tokenParsed: keycloakInstance.tokenParsed,
    refreshToken: keycloakInstance.refreshToken,
    updateToken: keycloakInstance.updateToken,
  };

  useEffect(() => {
    const initKeycloak = async () => {
      try {
        const authenticated = await keycloakInstance.init({
          onLoad: "check-sso",
        });

        if (authenticated) {
          const userProfile = await keycloakInstance.loadUserProfile();
          const roles = keycloakInstance.realmAccess?.roles || [];

          setUser({
            id: keycloakInstance.subject,
            username: userProfile.username,
            email: userProfile.email,
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            roles,
          });
        }

        setIsInitialized(true);
      } catch (error) {
        console.error("Keycloak init error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initKeycloak();
  }, []);

  return isInitialized ? (
    <KeycloakContext.Provider value={value}>
      {children}
    </KeycloakContext.Provider>
  ) : null;
}

export const useKeycloak = () => {
  const context = useContext(KeycloakContext);
  if (context === undefined) {
    throw new Error("useKeycloak must be used within a KeycloakProvider");
  }
  return context;
};
