import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { useStyles } from './styles';
import Text from '../../component/Text';
import { color, darkTheme, lightTheme } from '../../theme/color';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DiscoverStackParamList } from '../../stack/DiscoverStack';
import news from '../../mock/news.json';
import React, { useCallback, useMemo } from 'react';
import Separator from '../../component/Separator';
import U2UIcon from '../../asset/icon/u2u_wallet_icon.png';
import RenderHtml, { MixedStyleDeclaration } from 'react-native-render-html';
import { usePreferenceStore } from '../../state/preferences';
import Icon from '../../component/Icon';
import NewsList from '../../component/NewsList';
import { useFocusEffect } from "@react-navigation/native";
import { useGlobalStore } from "../../state/global";

type Props = NativeStackScreenProps<DiscoverStackParamList, 'NewsDetails'>;

const source = {
  html: `
<div>
    <p>
      So far, the Venture Builder model seems to become a signature for Unicorn Ultra when aiming to the ambitious to become a “digital cradle” for unique ideas that are looking for launchpads. That ambition is reflected more clearly through the U2U Foundation with the search for startups — those who develop products serving the decentralized future, specifically engineered for enterprise solutions and a strong commitment to Environmental, Social, and Governance considerations.
      In the same way, Chainly is trying to serve the best in the blockchain industry with its unique ideas through diverse terminal services, from development tools to auditing, marketing, listing, community management, etc. However, Chainly has yet to develop its own blockchain, but through cooperation with partners that own their chains — that’s why Unicorn Ultra with U2U Chain is a potential option.
      U2U Chain represents a groundbreaking advancement in blockchain technology and is focused on providing enterprise solutions and ESG. At its core lies the Helios Consensus, a revolutionary mechanism designed to address the critical needs of modern businesses. Helios serves as the bedrock of the U2U Chain, facilitating an astonishing throughput of up to 500,000 transactions per second (TPS). This design intricacy results in a blockchain solution that effortlessly harmonizes with existing systems, delivers airtight security and integrates cutting-edge privacy features.
      Moreover, the U2U Chain’s Helios Consensus boasts an impressively low transaction finality time of just 350 milliseconds. This near-instantaneous confirmation time ensures that transactions are rapidly validated and secured, creating an agile environment for business operations. This exceptional speed empowers businesses with unparalleled efficiency, enabling real-time transaction processing and data transfer at an unprecedented scale.
    </p>
    <img class="ad" src="https://fakeimg.pl/600x300/ff0000,128/000,255" alt="ad">
     <p>
      So far, the Venture Builder model seems to become a signature for Unicorn Ultra when aiming to the ambitious to become a “digital cradle” for unique ideas that are looking for launchpads. That ambition is reflected more clearly through the U2U Foundation with the search for startups — those who develop products serving the decentralized future, specifically engineered for enterprise solutions and a strong commitment to Environmental, Social, and Governance considerations.
      In the same way, Chainly is trying to serve the best in the blockchain industry with its unique ideas through diverse terminal services, from development tools to auditing, marketing, listing, community management, etc. However, Chainly has yet to develop its own blockchain, but through cooperation with partners that own their chains — that’s why Unicorn Ultra with U2U Chain is a potential option.
      U2U Chain represents a groundbreaking advancement in blockchain technology and is focused on providing enterprise solutions and ESG. At its core lies the Helios Consensus, a revolutionary mechanism designed to address the critical needs of modern businesses. Helios serves as the bedrock of the U2U Chain, facilitating an astonishing throughput of up to 500,000 transactions per second (TPS). This design intricacy results in a blockchain solution that effortlessly harmonizes with existing systems, delivers airtight security and integrates cutting-edge privacy features.
      Moreover, the U2U Chain’s Helios Consensus boasts an impressively low transaction finality time of just 350 milliseconds. This near-instantaneous confirmation time ensures that transactions are rapidly validated and secured, creating an agile environment for business operations. This exceptional speed empowers businesses with unparalleled efficiency, enabling real-time transaction processing and data transfer at an unprecedented scale.
    </p>
</div>

  `,
};

const NewsDetailScreen = ({ route, navigation }: Props) => {
  const { setRouteName } = useGlobalStore();
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  const styles = useStyles();

  const actions = [
    { name: 'twitter', url: '', icon: 'twitter-circle' },
    { name: 'facebook', url: '', icon: 'facebook-circle' },
    { name: 'telegram', url: '', icon: 'telegram-circle' },
    { name: 'discord', url: '', icon: 'discord-circle' },
    { name: 'youtube', url: '', icon: 'youtube-circle' },
    { name: 'website', url: '', icon: 'website' },
  ];

  const article = useMemo(() => {
    return news.find(item => item.id === route.params?.id);
  }, [route.params]);

  const mixedStyle: Record<string, MixedStyleDeclaration> = useMemo(() => {
    return {
      p: styles.description,
    };
  }, [preferenceTheme]);

  const classesStyle: Record<string, MixedStyleDeclaration> = {
    ad: {
      width: '100%',
      height: 60,
      objectFit: 'cover',
      marginVertical: 16,
      borderRadius: 12,
      alignSelf: 'center'
    },
  };

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );

  if (!article) {
    return (
      <View style={[styles.container, { padding: 16 }]}>
        <Text style={styles.title}>Article not found!</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{ padding: 16, paddingBottom: 120 }}>
          <View style={{ gap: 8 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" width={24} height={24} />
            </TouchableOpacity>
            <Image
              resizeMode="cover"
              style={styles.newsImage}
              source={{
                uri: 'https://fakeimg.pl/400x200/ff0000,128/000,255',
              }}
            />

            <Text style={[styles.title, { lineHeight: 25 }]} fontSize={20}>
              From newbie to veteran: Three methods of Cryptocurrency Analysis
              for successful trading
            </Text>

            <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
              <Text style={styles.caption}>{article.category}</Text>
              <View
                style={{
                  width: 4,
                  height: 4,
                  backgroundColor: color.primary[500],
                  borderRadius: 2,
                }}
              />
              <Text style={styles.caption}>{article.date}</Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Image source={U2UIcon} style={{ width: 40, height: 40 }}/>
              <View style={{ flex: 1 }}>
                <Text style={styles.title} fontSize={14}>
                  U2U Council
                </Text>
                <Text style={styles.description}>{article.description}</Text>
              </View>
            </View>
          </View>

          <Separator style={{ borderBottomWidth: 1, marginVertical: 16 }}/>

          <RenderHtml
            source={source}
            tagsStyles={mixedStyle}
            classesStyles={classesStyle}
            contentWidth={Dimensions.get('window').width - 32}
            renderersProps={{
              img: {
                enableExperimentalPercentWidth: true
              }
            }}
          />

          <Text style={[styles.title, { marginTop: 24 }]} fontSize={17}>
            Get the latest updates here
          </Text>

          <View
            style={{
              flexDirection: 'row',
              gap: 16,
              alignItems: 'center',
              marginTop: 16,
            }}>
            {actions.map(action => {
              return (
                <TouchableOpacity key={action.name}>
                  <Icon name={action.icon} width={20} height={20}/>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={[styles.row, { marginVertical: 24 }]}>
            <Text style={styles.title} fontSize={16} letterSpacing={0.06}>
              Read Next
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate('Home', { defaultTab: 'latest' })}>
              <Icon
                name="arrow-right"
                width={24}
                height={24}
                color={color.neutral[500]}
              />
            </TouchableOpacity>
          </View>

          <NewsList news={news.slice(0, 4)} hideTopNews/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsDetailScreen;
