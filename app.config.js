import "dotenv/config";

export default {
  expo: {
    scheme: "acme",
    web: {
      bundler: "metro",
    },
    name: "Career Hunter",
    slug: "stay-hired",
    version: "1.0.7",
    icon: "./assets/images/career_hunter.png",
    splash: {
      image: "./assets/images/career_hunter_2.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    extra: {
      eas: {
        projectId: "d61e2764-78ab-4258-a29e-4c5a869e4fd8",
      },
      RapidAPI_Key: process.env.RapidAPI_Key,
      RapidAPI_Host: process.env.RapidAPI_Host,
    },
    owner: "maxic_gray",
    runtimeVersion: {
      policy: "sdkVersion",
    },
    updates: {
      url: "https://u.expo.dev/d61e2764-78ab-4258-a29e-4c5a869e4fd8",
    },
    android: {
      package: "com.maxic_gray.stayhired",
      versionCode: 7,
    },
    ios: {
      bundleIdentifier: "-stayHired",
      supportsTablet: true,
      buildNumber: "1.0.7",
    },
    plugins: [
      [
        "expo-build-properties",
        {
          android: {
            enableProguardInReleaseBuilds: true,
          },
        },
      ],
    ],
  },
};
