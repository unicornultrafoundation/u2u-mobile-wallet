import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import { styles } from "./styles";
import Text from "../../component/Text";
import { useTranslation } from "react-i18next";
import { usePreferenceStore } from "../../state/preferences";
import { darkTheme, lightTheme } from "../../theme/color";
import { generateMnemonic } from "../../util/wallet";
import Button from "../../component/Button";
import { useWallet } from "../../hook/useWallet";
import Icon from "../../component/Icon";
import theme from "../../theme";
import Toast from "react-native-toast-message";

const Step3 = () => {
  const { t } = useTranslation<string>();
  const { darkMode } = usePreferenceStore();
  const { accessWallet } = useWallet();

  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const [seed, setSeed] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSeed("");
    const s = generateMnemonic();
    setSeed(s || "");
  }, []);

  const handleSaveSeed = () => {
    setLoading(true);
    setTimeout(() => {
      accessWallet(seed);
      setLoading(false);
    }, 100);
  };

  const handleCopy = () => {
    Clipboard.setString(seed);
    Toast.show({
      type: "simpleNoti",
      text1: t('msgCopied'),
      props: {
        width: "45%"
      }
    });
  };

  return (
    <View style={styles.passwordContainer}>
      <Text style={styles.welcomeTitle}>
        {t("recoveryPhrase")}
      </Text>
      <Text style={styles.instructionText}>
        {t("phraseWarning")}
      </Text>
      <Text style={styles.instructionText}>
        {t("phraseDescription")}
      </Text>
      <View style={{ width: "100%", flex: 1 }}>
        <View style={[styles.seedContainer, { backgroundColor: preferenceTheme.background.background }]}>
          {seed.length === 0 ? (
            <ActivityIndicator />
          ) : (
            <View style={{ width: "100%" }}>
              <View style={{ width: "100%", flexDirection: "row" }}>
                {seed.split(" ").slice(0, 4).map((word, index) => {
                  return (
                    <View style={styles.seedItem} key={`seed-${word}-${index}`}>
                      <Text style={styles.seed}>{index + 1}. {word}</Text>
                    </View>
                  );
                })}
              </View>
              <View style={{ width: "100%", flexDirection: "row" }}>
                {seed.split(" ").slice(4, 8).map((word, index) => {
                  return (
                    <View style={styles.seedItem} key={`seed-${word}-${index}`}>
                      <Text style={styles.seed}>{index + 5}. {word}</Text>
                    </View>
                  );
                })}
              </View>
              <View style={{ width: "100%", flexDirection: "row" }}>
                {seed.split(" ").slice(8, 12).map((word, index) => {
                  return (
                    <View style={styles.seedItem} key={`seed-${word}-${index}`}>
                      <Text style={styles.seed}>{index + 9}. {word}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}
        </View>
        {seed.length > 0 && (
          <Button
            type="text"
            style={{
              alignItems: "center",
              justifyContent: "flex-start",
              marginTop: 12,
              paddingHorizontal: 8
            }}
            textStyle={{
              color: theme.color.neutral[0]
            }}
            onPress={handleCopy}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="copy" width={16} height={16} style={{ marginRight: 4 }} />
              <Text style={{ fontWeight: "500", fontSize: 14 }}>{t('copyToClipboard')}</Text>
            </View>
          </Button>
        )}
      </View>
      {seed.length > 0 && (
        <Button
          fullWidth
          style={{
            borderRadius: 60
          }}
          onPress={handleSaveSeed}
          loading={loading}
        >
          {t('continue')}
        </Button>
      )}
    </View>
  );
};

export default Step3;
