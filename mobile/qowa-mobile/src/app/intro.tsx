import {
  FlatList,
  Image,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useRef, useState } from "react";
import { router } from "expo-router";
import images from "@/assets/images";
import { colors } from "@/theme/colors";
import { IntroSlide, introSlides } from "@/constants/intro-slides";

const Intro = () => {
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<FlatList<IntroSlide>>(null);
  const isLastSlide = activeIndex === introSlides.length - 1;

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  const onNext = () => {
    if (isLastSlide) {
      router.replace("/sign-up");
      return;
    }
    const nextIndex = activeIndex + 1;
    listRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    setActiveIndex(nextIndex);
  };

  const renderSlide = ({ item }: { item: IntroSlide }) => (
    <View style={{ width }}>
      <ImageBackground source={item.image} style={styles.image} resizeMode="cover">
        <View style={styles.imageContent}>
          <View style={styles.badge}>
            <Text style={{ color: colors.greenColor, fontSize: 15 }}>{item.badge.label}</Text>
            <Text style={{ color: colors.white, fontSize: 13 }}>{item.badge.title}</Text>
            <Text style={{ color: colors.textSecondary, fontSize: 10 }}>{item.badge.detail}</Text>
          </View>
        </View>
      </ImageBackground>

      <View style={{ marginTop: 20, padding: 20 }}>
        <Text style={{ color: colors.white, fontSize: 28, maxWidth: 150 }}>{item.title}</Text>
        <Text style={{ marginTop: 10, color: colors.textSecondary, maxWidth: 340, fontSize: 16 }}>
          {item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={introSlides}
        keyExtractor={(item) => item.id}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
      />

      <SafeAreaView edges={["top"]} style={styles.headerWrapper} pointerEvents="box-none">
        <View style={styles.header}>
          <View style={styles.logo}>
            <Image
              source={images.iconHeader}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />
            <Text style={{ color: colors.white, fontSize: 20, fontWeight: "bold" }}>Qawa</Text>
          </View>
          <TouchableOpacity style={styles.skip} onPress={() => router.replace("/sign-up")}>
            <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>Skip</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <SafeAreaView edges={["bottom"]} style={styles.footer}>
        <View style={styles.dots}>
          {introSlides.map((slide, i) => (
            <View key={slide.id} style={[styles.dot, i === activeIndex && styles.dotActive]} />
          ))}
        </View>
        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
          <Text style={styles.nextText}>{isLastSlide ? "Get Started" : "Next"}</Text>
          <Text style={[styles.nextText, { fontSize: 20 }]}>→</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: { width: "100%", height: 550 },
  imageContent: { flex: 1, justifyContent: "flex-end", paddingBottom: 20 },
  badge: {
    backgroundColor: colors.bgbutton,
    width: 200,
    marginLeft: 30,
    height: 46,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
    borderColor: colors.textSecondary,
    borderWidth: 1,
  },
  headerWrapper: { position: "absolute", top: 0, left: 0, right: 0 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: { flexDirection: "row", gap: 10, alignItems: "center" },
  skip: {
    backgroundColor: colors.bgBase,
    width: 65,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  dots: { flexDirection: "row", alignItems: "center", gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.bgbutton },
  dotActive: { width: 24, backgroundColor: colors.greenColor },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.greenColor,
    paddingHorizontal: 28,
    height: 56,
    borderRadius: 16,
  },
  nextText: { color: colors.bgBase, fontSize: 17, fontWeight: "bold" },
});
