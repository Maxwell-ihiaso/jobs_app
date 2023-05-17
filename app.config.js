import "dotenv/config";

export default {
  expo: {
    scheme: "acme",
    web: {
      bundler: "metro",
    },
    name: "jobs_app",
    slug: "stay-hired",
    version: "1.0.4",
    orientation: "portrait",
    userInterfaceStyle: "automatic",
    assestBundlePatterns: ["**/*"],
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
      fallbackToCacheTimeout: 0,
    },
    android: {
      package: "com.maxic_gray.stayhired",
      versionCode: 4,
      adaptiveIcon: {
        foregroundImage:
          "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
        backgroundColor: "#ffffff",
      },
    },
    ios: {
      bundleIdentifier: "-stayHired",
      supportsTablet: true,
      buildNumber: "1.0.4",
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
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission:
            "Allow $(PRODUCT_NAME) to use your location.",
        },
      ],
    ],
  },
};
