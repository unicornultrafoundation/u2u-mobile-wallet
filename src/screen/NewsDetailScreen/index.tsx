import {
  ActivityIndicator,
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
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Separator from '../../component/Separator';
import U2UIcon from '../../asset/icon/u2u_wallet_icon.png';
import RenderHtml, { MixedStyleDeclaration } from 'react-native-render-html';
import { usePreferenceStore } from '../../state/preferences';
import Icon from '../../component/Icon';
import NewsList from '../../component/NewsList';
import { useFocusEffect } from "@react-navigation/native";
import { useGlobalStore } from "../../state/global";
import { Article } from "../DiscoverScreen";

type Props = NativeStackScreenProps<DiscoverStackParamList, 'NewsDetails'>;

const NewsDetailScreen = ({ route, navigation }: Props) => {
  const { setRouteName } = useGlobalStore();
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  const styles = useStyles();
  const [loading, setLoading] = useState(true)
  const [news, setNews] = useState<Article[]>([])


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
  }, [route.params, news]);

  const htmlSource = useMemo(() => {
    return { html: article?.content || '' }
  }, [article])

  const mixedStyle: Record<string, MixedStyleDeclaration> = useMemo(() => {
    const pStyle = { ...styles.description, fontSize: 12 }
    const headerStyle = { ...styles.title, fontSize: 20 }
    const headingStyle = { ...styles.description, fontSize: 14 }
    return {
      h1: headerStyle,
      h2: headingStyle,
      h3: headingStyle,
      h4: headingStyle,
      h5: headingStyle,
      h6: headingStyle,
      time: pStyle,
      p: pStyle,
      span: pStyle,
      i: pStyle
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

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://raw.githubusercontent.com/unicornultrafoundation/static-news/main/news.json')
        const data = await res.json()
        setNews(data)
      } catch (e) {
        setNews([])
      } finally {
        setLoading(false)
      }
    })()
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { padding: 16 }]}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator/>
        </View>
      </View>
    )
  }

  if (!article) {
    return (
      <View style={[styles.container, { padding: 16 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" width={24} height={24}/>
        </TouchableOpacity>
        <Text style={[styles.title, { textAlign: 'center' }]}>Article not found!</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{ padding: 16, paddingBottom: 120 }}>
          <View style={{ gap: 8 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" width={24} height={24}/>
            </TouchableOpacity>
            <Image
              resizeMode="cover"
              style={styles.newsImage}
              source={{ uri: article.thumbnail }}
            />

            <Text style={[styles.title, { lineHeight: 25 }]} fontSize={20}>
              {article.title}
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
            source={htmlSource}
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
