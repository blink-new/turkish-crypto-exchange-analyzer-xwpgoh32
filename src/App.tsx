import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { Search, Shield, TrendingUp, AlertTriangle, Star, CheckCircle, XCircle, Building2, AlertCircle } from 'lucide-react'

interface Exchange {
  id: string
  name: string
  oldName?: string
  logo: string
  safetyRating: number
  features: string[]
  drawbacks: string[]
  tradingFees: string
  withdrawalFees: string
  supportedCoins: number
  established: string
  regulation: string
  website: string
  isRestricted?: boolean
  restrictionNote?: string
}

interface CustodyProvider {
  id: string
  name: string
  oldName?: string
  type: 'bank' | 'company'
  logo: string
  established: string
  website: string
}

const exchanges: Exchange[] = [
  // Aktif Borsalar (SPK Geçici Listesi - İlk 20 Firma)
  {
    id: 'btcturk',
    name: 'Btcturk Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Eliptik Yazılım Ticaret AŞ',
    logo: '₿',
    safetyRating: 92,
    features: [
      'Türkiye\'nin en büyük kripto borsası',
      'SPK geçici listesinde',
      'Güçlü güvenlik altyapısı',
      'Türk Lirası desteği',
      'Mobil uygulama'
    ],
    drawbacks: [
      'Yüksek işlem ücretleri',
      'Sınırlı altcoin seçeneği',
      'Müşteri hizmetleri yavaş'
    ],
    tradingFees: '0.2% - 0.4%',
    withdrawalFees: 'Değişken',
    supportedCoins: 50,
    established: '2013',
    regulation: 'SPK Geçici Liste',
    website: 'btcturk.com'
  },
  {
    id: 'arbitex',
    name: 'Arbitex Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Arbitex Finansal Teknolojileri AŞ',
    logo: '🔺',
    safetyRating: 72,
    features: [
      'Arbitraj odaklı platform',
      'Otomatik trading araçları',
      'API desteği',
      'Düşük latency',
      'Profesyonel araçlar'
    ],
    drawbacks: [
      'Karmaşık platform',
      'Yeni başlayanlar için zor',
      'Sınırlı müşteri desteği'
    ],
    tradingFees: '0.15% - 0.3%',
    withdrawalFees: 'Orta',
    supportedCoins: 100,
    established: '2020',
    regulation: 'SPK Geçici Liste',
    website: 'arbitex.com'
  },
  {
    id: 'bilira',
    name: 'Bilira Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Bilira Teknoloji AŞ',
    logo: '💰',
    safetyRating: 77,
    features: [
      'Türk Lirası odaklı stablecoin',
      'Düşük volatilite',
      'Hızlı transferler',
      'Yerel ödeme sistemleri',
      'Basit kullanım'
    ],
    drawbacks: [
      'Sınırlı kripto seçeneği',
      'Küçük pazar payı',
      'Likidite sorunları'
    ],
    tradingFees: '0.2% - 0.4%',
    withdrawalFees: 'Düşük',
    supportedCoins: 10,
    established: '2019',
    regulation: 'SPK Geçici Liste',
    website: 'bilira.co'
  },
  {
    id: 'binancetr',
    name: 'Binance Turkey Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'BN Teknoloji AŞ',
    logo: '🟡',
    safetyRating: 88,
    features: [
      'Dünya\'nin en büyük borsasının Türkiye versiyonu',
      'Geniş kripto para seçeneği',
      'Düşük işlem ücretleri',
      'Gelişmiş trading araçları',
      'Staking imkanları'
    ],
    drawbacks: [
      'Düzenleyici belirsizlikler',
      'Karmaşık arayüz yeni başlayanlar için',
      'Müşteri desteği İngilizce ağırlıklı'
    ],
    tradingFees: '0.1% - 0.2%',
    withdrawalFees: 'Düşük',
    supportedCoins: 200,
    established: '2020',
    regulation: 'SPK Geçici Liste',
    website: 'binance.com/tr'
  },
  {
    id: 'bitbns',
    name: 'Bitbns Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Bitbns Teknoloji AŞ',
    logo: '🔷',
    safetyRating: 74,
    features: [
      'Hindistan merkezli global platform',
      'Çoklu kripto para desteği',
      'Mobil uygulama',
      'Staking seçenekleri',
      'Düşük işlem ücretleri'
    ],
    drawbacks: [
      'Türkiye pazarında yeni',
      'Sınırlı Türkçe destek',
      'Yerel ödeme seçenekleri az'
    ],
    tradingFees: '0.25% - 0.4%',
    withdrawalFees: 'Orta',
    supportedCoins: 150,
    established: '2021',
    regulation: 'SPK Geçici Liste',
    website: 'bitbns.com'
  },
  {
    id: 'bitexen',
    name: 'Bitexen Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Bitexen Teknoloji AŞ',
    logo: '⚡',
    safetyRating: 78,
    features: [
      'Yerli borsa',
      'Türk Lirası odaklı',
      'Basit kullanım',
      'Hızlı işlemler',
      'Düşük minimum işlem tutarı'
    ],
    drawbacks: [
      'Sınırlı likidite',
      'Az kripto para seçeneği',
      'Teknik analiz araçları yetersiz'
    ],
    tradingFees: '0.25% - 0.4%',
    withdrawalFees: 'Orta',
    supportedCoins: 25,
    established: '2018',
    regulation: 'SPK Geçici Liste',
    website: 'bitexen.com'
  },
  {
    id: 'bithero',
    name: 'Bithero Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Bithero Elektronik Hizmetler AŞ',
    logo: '🦸',
    safetyRating: 71,
    features: [
      'Kullanıcı dostu arayüz',
      'Türkçe müşteri desteği',
      'Hızlı işlem süreleri',
      'Mobil uygulama',
      'Eğitim içerikleri'
    ],
    drawbacks: [
      'Küçük pazar payı',
      'Sınırlı kripto seçeneği',
      'Likidite sorunları'
    ],
    tradingFees: '0.3% - 0.5%',
    withdrawalFees: 'Orta',
    supportedCoins: 30,
    established: '2019',
    regulation: 'SPK Geçici Liste',
    website: 'bithero.com'
  },
  {
    id: 'bitlo',
    name: 'Bitlo Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Bitlo Teknoloji AŞ',
    logo: '🎯',
    safetyRating: 73,
    features: [
      'Basit ve anlaşılır arayüz',
      'Türk Lirası desteği',
      'Hızlı kayıt süreci',
      'Mobil uyumlu',
      'Düşük minimum tutarlar'
    ],
    drawbacks: [
      'Sınırlı kripto para çeşidi',
      'Küçük işlem hacmi',
      'Gelişmiş araçlar eksik'
    ],
    tradingFees: '0.25% - 0.45%',
    withdrawalFees: 'Orta',
    supportedCoins: 20,
    established: '2020',
    regulation: 'SPK Geçici Liste',
    website: 'bitlo.com'
  },
  {
    id: 'bybittr',
    name: 'Bybit Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Narkasa Yazılım Ticaret AŞ',
    logo: '🟨',
    safetyRating: 79,
    features: [
      'Türev işlemler uzmanı',
      'Yüksek kaldıraç seçenekleri',
      'Gelişmiş risk yönetimi',
      'Hızlı emir gerçekleştirme',
      'Profesyonel trading araçları'
    ],
    drawbacks: [
      'Yüksek risk (türevler)',
      'Karmaşık ürünler',
      'Deneyim gerektirir'
    ],
    tradingFees: '0.1% - 0.2%',
    withdrawalFees: 'Düşük',
    supportedCoins: 250,
    established: '2022',
    regulation: 'SPK Geçici Liste',
    website: 'bybit.com/tr'
  },
  {
    id: 'citypay',
    name: 'Citypay Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Citypay Bilgisayar Teknolojileri Ticaret AŞ',
    logo: '🏙️',
    safetyRating: 69,
    features: [
      'Ödeme odaklı platform',
      'Hızlı transferler',
      'Düşük işlem ücretleri',
      'Basit kullanım',
      'Türkçe destek'
    ],
    drawbacks: [
      'Sınırlı kripto seçeneği',
      'Küçük pazar payı',
      'Gelişmiş özellikler eksik'
    ],
    tradingFees: '0.2% - 0.4%',
    withdrawalFees: 'Düşük',
    supportedCoins: 15,
    established: '2021',
    regulation: 'SPK Geçici Liste',
    website: 'citypay.com'
  },
  {
    id: 'clts',
    name: 'CLTS Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'CLTS Teknoloji AŞ',
    logo: '🔗',
    safetyRating: 68,
    features: [
      'Blockchain teknolojisi odaklı',
      'Güvenli altyapı',
      'API desteği',
      'Otomatik trading',
      'Teknik analiz araçları'
    ],
    drawbacks: [
      'Karmaşık arayüz',
      'Sınırlı müşteri desteği',
      'Yüksek öğrenme eğrisi'
    ],
    tradingFees: '0.2% - 0.35%',
    withdrawalFees: 'Orta',
    supportedCoins: 80,
    established: '2020',
    regulation: 'SPK Geçici Liste',
    website: 'clts.com'
  },
  {
    id: 'coino',
    name: 'Coino Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Coino Teknoloji AŞ',
    logo: '🪙',
    safetyRating: 70,
    features: [
      'Kullanıcı dostu tasarım',
      'Hızlı işlem süreleri',
      'Mobil uygulama',
      'Türkçe müşteri desteği',
      'Eğitim materyalleri'
    ],
    drawbacks: [
      'Sınırlı kripto para çeşidi',
      'Küçük işlem hacmi',
      'Likidite sorunları'
    ],
    tradingFees: '0.25% - 0.4%',
    withdrawalFees: 'Orta',
    supportedCoins: 25,
    established: '2019',
    regulation: 'SPK Geçici Liste',
    website: 'coino.com'
  },
  {
    id: 'cointr',
    name: 'Cointr Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Metx Dijital Bilişim Teknoloji AŞ',
    logo: '🇹🇷',
    safetyRating: 75,
    features: [
      'Türkiye odaklı platform',
      'Yerel ödeme sistemleri',
      'Türk Lirası desteği',
      'Hızlı KYC süreci',
      'Mobil uyumlu'
    ],
    drawbacks: [
      'Sınırlı global erişim',
      'Az kripto para seçeneği',
      'Küçük pazar payı'
    ],
    tradingFees: '0.2% - 0.4%',
    withdrawalFees: 'Düşük',
    supportedCoins: 35,
    established: '2020',
    regulation: 'SPK Geçici Liste',
    website: 'cointr.com'
  },
  {
    id: 'crybo',
    name: 'Crybo Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Crybo Exchange Teknoloji Yatırımları AŞ',
    logo: '🤖',
    safetyRating: 67,
    features: [
      'Otomatik trading botları',
      'Gelişmiş algoritma desteği',
      'API entegrasyonu',
      'Teknik analiz araçları',
      'Profesyonel arayüz'
    ],
    drawbacks: [
      'Karmaşık kullanım',
      'Yüksek öğrenme eğrisi',
      'Sınırlı müşteri desteği'
    ],
    tradingFees: '0.15% - 0.3%',
    withdrawalFees: 'Orta',
    supportedCoins: 120,
    established: '2021',
    regulation: 'SPK Geçici Liste',
    website: 'crybo.com'
  },
  {
    id: 'destek',
    name: 'Destek Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Destek Grup Teknoloji Hizmetleri AŞ',
    logo: '🛠️',
    safetyRating: 66,
    features: [
      'Güçlü müşteri desteği',
      'Türkçe hizmet',
      'Basit kullanım',
      'Hızlı işlemler',
      'Eğitim desteği'
    ],
    drawbacks: [
      'Sınırlı kripto seçeneği',
      'Küçük işlem hacmi',
      'Gelişmiş özellikler eksik'
    ],
    tradingFees: '0.3% - 0.5%',
    withdrawalFees: 'Orta',
    supportedCoins: 20,
    established: '2020',
    regulation: 'SPK Geçici Liste',
    website: 'destek.com'
  },
  {
    id: 'dyor',
    name: 'Dyor Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Dyor Bilişim Teknolojileri AŞ',
    logo: '🔍',
    safetyRating: 72,
    features: [
      'Araştırma odaklı platform',
      'Detaylı analiz araçları',
      'Eğitim içerikleri',
      'Piyasa analizleri',
      'Uzman görüşleri'
    ],
    drawbacks: [
      'Karmaşık arayüz',
      'Yeni başlayanlar için zor',
      'Sınırlı işlem hacmi'
    ],
    tradingFees: '0.2% - 0.35%',
    withdrawalFees: 'Orta',
    supportedCoins: 60,
    established: '2020',
    regulation: 'SPK Geçici Liste',
    website: 'dyor.com'
  },
  {
    id: 'finnova',
    name: 'Finnova Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Finnova Teknoloji AŞ',
    logo: '💎',
    safetyRating: 73,
    features: [
      'Fintech odaklı yaklaşım',
      'Yenilikçi özellikler',
      'Mobil öncelikli tasarım',
      'Hızlı işlem süreleri',
      'Kullanıcı dostu arayüz'
    ],
    drawbacks: [
      'Yeni platform',
      'Sınırlı geçmiş',
      'Küçük pazar payı'
    ],
    tradingFees: '0.2% - 0.4%',
    withdrawalFees: 'Düşük',
    supportedCoins: 40,
    established: '2021',
    regulation: 'SPK Geçici Liste',
    website: 'finnova.com'
  },
  // 21-40 Arası Firmalar
  {
    id: 'futurance',
    name: 'Futurance Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Futurance Finans Teknolojileri AŞ',
    logo: '🚀',
    safetyRating: 74,
    features: [
      'Gelecek odaklı teknoloji',
      'DeFi entegrasyonu',
      'Akıllı kontrat desteği',
      'Yenilikçi trading araçları',
      'Blockchain analitikleri'
    ],
    drawbacks: [
      'Karmaşık ürünler',
      'Yüksek öğrenme eğrisi',
      'Sınırlı müşteri desteği'
    ],
    tradingFees: '0.2% - 0.35%',
    withdrawalFees: 'Orta',
    supportedCoins: 85,
    established: '2021',
    regulation: 'SPK Geçici Liste',
    website: 'futurance.com'
  },
  {
    id: 'fuze',
    name: 'Fuze Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Fuze Teknoloji AŞ',
    logo: '⚡',
    safetyRating: 71,
    features: [
      'Hızlı işlem altyapısı',
      'Düşük latency',
      'API trading desteği',
      'Otomatik emir türleri',
      'Gelişmiş grafik araçları'
    ],
    drawbacks: [
      'Sınırlı kripto seçeneği',
      'Küçük işlem hacmi',
      'Yeni platform'
    ],
    tradingFees: '0.25% - 0.4%',
    withdrawalFees: 'Orta',
    supportedCoins: 45,
    established: '2022',
    regulation: 'SPK Geçici Liste',
    website: 'fuze.com'
  },
  {
    id: 'garantibbva',
    name: 'Garanti BBVA Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Garanti BBVA Dijital Varlıklar AŞ',
    logo: '🏦',
    safetyRating: 89,
    features: [
      'Güçlü banka desteği',
      'Kurumsal güvenilirlik',
      'Düzenleyici uyum',
      'Profesyonel hizmet',
      'Güvenli altyapı'
    ],
    drawbacks: [
      'Sınırlı kripto seçeneği',
      'Yüksek minimum tutarlar',
      'Katı KYC süreçleri'
    ],
    tradingFees: '0.3% - 0.5%',
    withdrawalFees: 'Yüksek',
    supportedCoins: 20,
    established: '2022',
    regulation: 'SPK Geçici Liste',
    website: 'garantibbva.com.tr'
  },
  {
    id: 'gate',
    name: 'Gate Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Gate Teknoloji AŞ',
    logo: '🚪',
    safetyRating: 81,
    features: [
      'Global platform deneyimi',
      'Geniş kripto seçeneği',
      'Gelişmiş trading araçları',
      'Futures ve spot trading',
      'Staking imkanları'
    ],
    drawbacks: [
      'Karmaşık arayüz',
      'Yüksek işlem hacmi gereksinimi',
      'Sınırlı Türkçe destek'
    ],
    tradingFees: '0.1% - 0.2%',
    withdrawalFees: 'Düşük',
    supportedCoins: 300,
    established: '2021',
    regulation: 'SPK Geçici Liste',
    website: 'gate.io'
  },
  {
    id: 'gmsglobal',
    name: 'GMS Global Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'GMS Global Teknoloji AŞ',
    logo: '🌐',
    safetyRating: 65,
    isRestricted: true,
    restrictionNote: 'Yeni müşteri kabulü durdurulmuş, sadece mevcut müşteriler işlem yapabilir',
    features: [
      'Global pazar erişimi',
      'Çoklu dil desteği',
      'Mobil uygulama',
      'Temel trading araçları',
      'Hızlı kayıt'
    ],
    drawbacks: [
      'Kısıtlı operasyon',
      'Belirsiz gelecek',
      'Sınırlı müşteri desteği'
    ],
    tradingFees: '0.3% - 0.5%',
    withdrawalFees: 'Yüksek',
    supportedCoins: 30,
    established: '2021',
    regulation: 'SPK Geçici Liste (Kısıtlı)',
    website: 'gmsglobal.com'
  },
  {
    id: 'goart',
    name: 'Goart Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Goart Teknoloji AŞ',
    logo: '🎨',
    safetyRating: 69,
    features: [
      'NFT odaklı platform',
      'Dijital sanat pazarı',
      'Yaratıcı ekonomi desteği',
      'Sosyal özellikler',
      'Koleksiyon yönetimi'
    ],
    drawbacks: [
      'Niş pazar',
      'Sınırlı kripto trading',
      'Küçük kullanıcı tabanı'
    ],
    tradingFees: '0.25% - 0.4%',
    withdrawalFees: 'Orta',
    supportedCoins: 25,
    established: '2021',
    regulation: 'SPK Geçici Liste',
    website: 'goart.com'
  },
  {
    id: 'gumusglobal',
    name: 'Gümüş Global Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Gümüş Global Teknoloji AŞ',
    logo: '🥈',
    safetyRating: 64,
    isRestricted: true,
    restrictionNote: 'Yeni müşteri kabulü durdurulmuş, sadece mevcut müşteriler işlem yapabilir',
    features: [
      'Değerli metal odaklı',
      'Altın-gümüş tokenları',
      'Fiziksel varlık desteği',
      'Hedge imkanları',
      'Güvenli saklama'
    ],
    drawbacks: [
      'Kısıtlı operasyon',
      'Sınırlı kripto seçeneği',
      'Belirsiz durum'
    ],
    tradingFees: '0.3% - 0.6%',
    withdrawalFees: 'Yüksek',
    supportedCoins: 15,
    established: '2020',
    regulation: 'SPK Geçici Liste (Kısıtlı)',
    website: 'gumusglobal.com'
  },
  {
    id: 'hotto',
    name: 'Hotto Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Hotto Yazılım Ticaret AŞ',
    logo: '🔥',
    safetyRating: 70,
    features: [
      'Trend odaklı platform',
      'Sosyal trading',
      'Kopya trading',
      'Topluluk özellikleri',
      'Eğitim içerikleri'
    ],
    drawbacks: [
      'Yeni platform',
      'Sınırlı geçmiş',
      'Küçük işlem hacmi'
    ],
    tradingFees: '0.25% - 0.45%',
    withdrawalFees: 'Orta',
    supportedCoins: 35,
    established: '2022',
    regulation: 'SPK Geçici Liste',
    website: 'hotto.com'
  },
  {
    id: 'icrypex',
    name: 'ICRYPEX Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'ICRYPEX Bilişim AŞ',
    logo: '🧊',
    safetyRating: 76,
    features: [
      'Kurumsal odaklı hizmet',
      'Güvenli altyapı',
      'API entegrasyonu',
      'Toplu işlem desteği',
      'Profesyonel araçlar'
    ],
    drawbacks: [
      'Yüksek minimum tutarlar',
      'Karmaşık arayüz',
      'Sınırlı perakende destek'
    ],
    tradingFees: '0.2% - 0.35%',
    withdrawalFees: 'Orta',
    supportedCoins: 60,
    established: '2019',
    regulation: 'SPK Geçici Liste',
    website: 'icrypex.com'
  },
  {
    id: 'kointra',
    name: 'Kointra Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Kointra Bilişim ve Teknoloji AŞ',
    logo: '🔄',
    safetyRating: 72,
    features: [
      'Kullanıcı dostu arayüz',
      'Hızlı işlem süreleri',
      'Mobil optimizasyon',
      'Türkçe destek',
      'Basit KYC süreci'
    ],
    drawbacks: [
      'Sınırlı kripto seçeneği',
      'Küçük pazar payı',
      'Gelişmiş özellikler eksik'
    ],
    tradingFees: '0.25% - 0.4%',
    withdrawalFees: 'Orta',
    supportedCoins: 40,
    established: '2020',
    regulation: 'SPK Geçici Liste',
    website: 'kointra.com'
  },
  {
    id: 'kripdome',
    name: 'Kripdome Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Dome Teknoloji AŞ',
    logo: '🏛️',
    safetyRating: 68,
    features: [
      'Güvenlik odaklı yaklaşım',
      'Çoklu imza desteği',
      'Soğuk saklama',
      'Sigorta koruması',
      'Düzenli güvenlik denetimleri'
    ],
    drawbacks: [
      'Sınırlı işlem hacmi',
      'Yavaş işlem süreleri',
      'Küçük kripto seçeneği'
    ],
    tradingFees: '0.3% - 0.5%',
    withdrawalFees: 'Yüksek',
    supportedCoins: 25,
    established: '2021',
    regulation: 'SPK Geçici Liste',
    website: 'kripdome.com'
  },
  {
    id: 'kriptrade',
    name: 'Kriptrade Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Kriptrade Yazılım ve Ticaret AŞ',
    logo: '📈',
    safetyRating: 66,
    isRestricted: true,
    restrictionNote: 'Yeni müşteri kabulü durdurulmuş, sadece mevcut müşteriler işlem yapabilir',
    features: [
      'Trading odaklı platform',
      'Teknik analiz araçları',
      'Grafik çizim araçları',
      'Otomatik emirler',
      'Piyasa analizleri'
    ],
    drawbacks: [
      'Kısıtlı operasyon',
      'Karmaşık arayüz',
      'Belirsiz gelecek'
    ],
    tradingFees: '0.2% - 0.4%',
    withdrawalFees: 'Orta',
    supportedCoins: 50,
    established: '2020',
    regulation: 'SPK Geçici Liste (Kısıtlı)',
    website: 'kriptrade.com'
  },
  {
    id: 'kuantist',
    name: 'Kuantist Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Kuantist Teknoloji AŞ',
    logo: '📊',
    safetyRating: 75,
    features: [
      'Kuantum trading algoritmaları',
      'Yapay zeka desteği',
      'Algoritmik trading',
      'Risk yönetimi araçları',
      'Portföy optimizasyonu'
    ],
    drawbacks: [
      'Karmaşık sistem',
      'Yüksek öğrenme eğrisi',
      'Pahalı ücretler'
    ],
    tradingFees: '0.15% - 0.3%',
    withdrawalFees: 'Orta',
    supportedCoins: 100,
    established: '2021',
    regulation: 'SPK Geçici Liste',
    website: 'kuantist.com'
  },
  {
    id: 'kuturk',
    name: 'Kuturk Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Kuturk Bilişim ve Teknoloji AŞ',
    logo: '🎯',
    safetyRating: 67,
    features: [
      'Türkiye odaklı hizmet',
      'Yerel ödeme sistemleri',
      'Türkçe müşteri desteği',
      'Basit kullanım',
      'Hızlı onay süreçleri'
    ],
    drawbacks: [
      'Sınırlı global erişim',
      'Az kripto seçeneği',
      'Küçük işlem hacmi'
    ],
    tradingFees: '0.3% - 0.5%',
    withdrawalFees: 'Orta',
    supportedCoins: 30,
    established: '2021',
    regulation: 'SPK Geçici Liste',
    website: 'kuturk.com'
  },
  {
    id: 'magicianofmeta',
    name: 'Magician of Meta Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Magician of Meta Teknoloji AŞ',
    logo: '🎩',
    safetyRating: 63,
    features: [
      'Metaverse odaklı',
      'NFT marketplace',
      'Oyun tokenları',
      'Sanal dünya entegrasyonu',
      'Web3 özellikleri'
    ],
    drawbacks: [
      'Niş pazar',
      'Yüksek volatilite',
      'Sınırlı kullanım alanı'
    ],
    tradingFees: '0.3% - 0.6%',
    withdrawalFees: 'Yüksek',
    supportedCoins: 40,
    established: '2022',
    regulation: 'SPK Geçici Liste',
    website: 'magicianofmeta.com'
  },
  {
    id: 'mexc',
    name: 'Mexc Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Mexc Teknoloji AŞ',
    logo: '🌟',
    safetyRating: 77,
    isRestricted: true,
    restrictionNote: 'Yeni müşteri kabulü durdurulmuş, sadece mevcut müşteriler işlem yapabilir',
    features: [
      'Global borsa deneyimi',
      'Geniş altcoin seçeneği',
      'Futures trading',
      'Staking imkanları',
      'Düşük işlem ücretleri'
    ],
    drawbacks: [
      'Kısıtlı operasyon',
      'Düzenleyici belirsizlik',
      'Sınırlı Türkçe destek'
    ],
    tradingFees: '0.1% - 0.2%',
    withdrawalFees: 'Düşük',
    supportedCoins: 400,
    established: '2021',
    regulation: 'SPK Geçici Liste (Kısıtlı)',
    website: 'mexc.com'
  },
  {
    id: 'midas',
    name: 'Midas Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Midas Blokzinciri Yazılım Teknolojileri AŞ',
    logo: '👑',
    safetyRating: 73,
    features: [
      'Blockchain teknolojisi uzmanı',
      'DeFi protokol entegrasyonu',
      'Yield farming',
      'Likidite madenciliği',
      'Akıllı kontrat desteği'
    ],
    drawbacks: [
      'Karmaşık ürünler',
      'Yüksek risk',
      'Deneyim gerektirir'
    ],
    tradingFees: '0.2% - 0.35%',
    withdrawalFees: 'Orta',
    supportedCoins: 80,
    established: '2020',
    regulation: 'SPK Geçici Liste',
    website: 'midas.com'
  },
  {
    id: 'minka',
    name: 'Minka Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Minka Finansal Teknolojiler AŞ',
    logo: '💫',
    safetyRating: 71,
    features: [
      'Fintech odaklı yaklaşım',
      'Mobil öncelikli tasarım',
      'Sosyal trading',
      'Eğitim platformu',
      'Kullanıcı dostu arayüz'
    ],
    drawbacks: [
      'Yeni platform',
      'Sınırlı geçmiş',
      'Küçük işlem hacmi'
    ],
    tradingFees: '0.25% - 0.4%',
    withdrawalFees: 'Orta',
    supportedCoins: 45,
    established: '2022',
    regulation: 'SPK Geçici Liste',
    website: 'minka.com'
  },
  {
    id: 'misyon',
    name: 'Misyon Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Misyon Teknoloji Dijital Varlık Hizmetleri AŞ',
    logo: '🎯',
    safetyRating: 69,
    features: [
      'Misyon odaklı yaklaşım',
      'Sosyal sorumluluk',
      'Şeffaf işlemler',
      'Topluluk odaklı',
      'Eğitim desteği'
    ],
    drawbacks: [
      'Sınırlı kripto seçeneği',
      'Küçük pazar payı',
      'Yavaş büyüme'
    ],
    tradingFees: '0.3% - 0.5%',
    withdrawalFees: 'Orta',
    supportedCoins: 30,
    established: '2021',
    regulation: 'SPK Geçici Liste',
    website: 'misyon.com'
  },
  // 41-60 Arası Firmalar (Son 20 Firma)
  {
    id: 'necen',
    name: 'Necen Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Necen Teknoloji AŞ',
    logo: '🔮',
    safetyRating: 62,
    isRestricted: true,
    restrictionNote: 'Yeni müşteri kabulü durdurulmuş, sadece mevcut müşteriler işlem yapabilir',
    features: [
      'Yenilikçi teknoloji',
      'Mobil odaklı',
      'Basit arayüz',
      'Hızlı işlemler',
      'Düşük ücretler'
    ],
    drawbacks: [
      'Kısıtlı operasyon',
      'Belirsiz gelecek',
      'Sınırlı destek'
    ],
    tradingFees: '0.25% - 0.4%',
    withdrawalFees: 'Orta',
    supportedCoins: 35,
    established: '2021',
    regulation: 'SPK Geçici Liste (Kısıtlı)',
    website: 'necen.com'
  },
  {
    id: 'okxtr',
    name: 'OKX TR Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'OKX Teknoloji AŞ',
    logo: '⭕',
    safetyRating: 84,
    features: [
      'Global OKX deneyimi',
      'Geniş kripto seçeneği',
      'Gelişmiş türev ürünler',
      'Yüksek likidite',
      'Profesyonel araçlar'
    ],
    drawbacks: [
      'Karmaşık arayüz',
      'Yüksek risk ürünleri',
      'Sınırlı Türkçe destek'
    ],
    tradingFees: '0.1% - 0.15%',
    withdrawalFees: 'Düşük',
    supportedCoins: 350,
    established: '2021',
    regulation: 'SPK Geçici Liste',
    website: 'okx.com/tr'
  },
  {
    id: 'onsmaster',
    name: 'Onsmaster Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Aigen Yazılım ve Teknoloji Dış Ticaret İthalat ve İhracat AŞ',
    logo: '🎮',
    safetyRating: 66,
    features: [
      'Oyun odaklı platform',
      'NFT marketplace',
      'Gaming tokenları',
      'Sosyal özellikler',
      'Topluluk desteği'
    ],
    drawbacks: [
      'Niş pazar',
      'Sınırlı kullanım',
      'Yüksek volatilite'
    ],
    tradingFees: '0.3% - 0.5%',
    withdrawalFees: 'Orta',
    supportedCoins: 50,
    established: '2022',
    regulation: 'SPK Geçici Liste',
    website: 'onsmaster.com'
  },
  {
    id: 'ovro',
    name: 'Ovro Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Ovro Bilişim Teknolojileri AŞ',
    logo: '🌊',
    safetyRating: 61,
    isRestricted: true,
    restrictionNote: 'Yeni müşteri kabulü durdurulmuş, sadece mevcut müşteriler işlem yapabilir',
    features: [
      'Akışkan tasarım',
      'Kullanıcı dostu',
      'Mobil optimizasyon',
      'Hızlı işlemler',
      'Basit KYC'
    ],
    drawbacks: [
      'Kısıtlı operasyon',
      'Belirsiz durum',
      'Sınırlı özellikler'
    ],
    tradingFees: '0.3% - 0.5%',
    withdrawalFees: 'Yüksek',
    supportedCoins: 25,
    established: '2021',
    regulation: 'SPK Geçici Liste (Kısıtlı)',
    website: 'ovro.com'
  },
  {
    id: 'paribu',
    name: 'Paribu Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Paribu Teknoloji AŞ',
    logo: '🟣',
    safetyRating: 85,
    features: [
      'Türkiye\'nin köklü borsası',
      'Güçlü güvenlik',
      'Geniş kripto seçeneği',
      'Türk Lirası desteği',
      'Mobil uygulama'
    ],
    drawbacks: [
      'Yüksek işlem ücretleri',
      'Müşteri hizmetleri yoğunluğu',
      'Sınırlı gelişmiş özellikler'
    ],
    tradingFees: '0.3% - 0.5%',
    withdrawalFees: 'Orta',
    supportedCoins: 80,
    established: '2017',
    regulation: 'SPK Geçici Liste',
    website: 'paribu.com'
  },
  {
    id: 'rain',
    name: 'Rain Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Rain Yazılım ve Ticaret AŞ',
    logo: '🌧️',
    safetyRating: 68,
    features: [
      'MENA bölgesi deneyimi',
      'Kurumsal hizmetler',
      'Güvenli altyapı',
      'Çoklu para birimi',
      'API desteği'
    ],
    drawbacks: [
      'Sınırlı Türkçe destek',
      'Küçük pazar payı',
      'Az kripto seçeneği'
    ],
    tradingFees: '0.25% - 0.4%',
    withdrawalFees: 'Orta',
    supportedCoins: 40,
    established: '2021',
    regulation: 'SPK Geçici Liste',
    website: 'rain.com'
  },
  {
    id: 'rootech',
    name: 'Rootech Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Rootech Finansal Teknolojiler AŞ',
    logo: '🌱',
    safetyRating: 63,
    isRestricted: true,
    restrictionNote: 'Yeni müşteri kabulü durdurulmuş, sadece mevcut müşteriler işlem yapabilir',
    features: [
      'Teknoloji odaklı',
      'Yenilikçi çözümler',
      'API entegrasyonu',
      'Otomatik trading',
      'Gelişmiş analitik'
    ],
    drawbacks: [
      'Kısıtlı operasyon',
      'Karmaşık sistem',
      'Belirsiz gelecek'
    ],
    tradingFees: '0.2% - 0.35%',
    withdrawalFees: 'Orta',
    supportedCoins: 70,
    established: '2020',
    regulation: 'SPK Geçici Liste (Kısıtlı)',
    website: 'rootech.com'
  },
  {
    id: 'safebit',
    name: 'Safebit Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Bitci Borsa Teknoloji AŞ',
    logo: '🛡️',
    safetyRating: 74,
    features: [
      'Güvenlik odaklı',
      'Spor tokenları',
      'Fan token desteği',
      'Sosyal özellikler',
      'Mobil uygulama'
    ],
    drawbacks: [
      'Niş pazar odağı',
      'Sınırlı genel kripto',
      'Yüksek volatilite'
    ],
    tradingFees: '0.25% - 0.4%',
    withdrawalFees: 'Orta',
    supportedCoins: 60,
    established: '2019',
    regulation: 'SPK Geçici Liste',
    website: 'safebit.com'
  },
  {
    id: 'stablex',
    name: 'Stablex Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Stablex Bilişim Teknoloji AŞ',
    logo: '⚖️',
    safetyRating: 70,
    features: [
      'Stablecoin odaklı',
      'Düşük volatilite',
      'Güvenli transferler',
      'Kurumsal hizmetler',
      'API desteği'
    ],
    drawbacks: [
      'Sınırlı kripto çeşidi',
      'Küçük pazar payı',
      'Az likidite'
    ],
    tradingFees: '0.2% - 0.3%',
    withdrawalFees: 'Düşük',
    supportedCoins: 20,
    established: '2021',
    regulation: 'SPK Geçici Liste',
    website: 'stablex.com'
  },
  {
    id: 'trinkex',
    name: 'Trinkex Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Loop Teknoloji Yazılım ve Danışmanlık Ticaret AŞ',
    logo: '🔗',
    safetyRating: 67,
    features: [
      'Loop teknolojisi',
      'Zincir entegrasyonu',
      'Cross-chain trading',
      'DeFi protokolleri',
      'Yield farming'
    ],
    drawbacks: [
      'Karmaşık teknoloji',
      'Yüksek risk',
      'Deneyim gerektirir'
    ],
    tradingFees: '0.2% - 0.35%',
    withdrawalFees: 'Orta',
    supportedCoins: 90,
    established: '2021',
    regulation: 'SPK Geçici Liste',
    website: 'trinkex.com'
  },
  {
    id: 'web3',
    name: 'Web3 Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'WEB3 Teknoloji AŞ',
    logo: '🌐',
    safetyRating: 65,
    isRestricted: true,
    restrictionNote: 'Yeni müşteri kabulü durdurulmuş, sadece mevcut müşteriler işlem yapabilir',
    features: [
      'Web3 odaklı',
      'Decentralized features',
      'DApp entegrasyonu',
      'NFT desteği',
      'Metaverse tokenları'
    ],
    drawbacks: [
      'Kısıtlı operasyon',
      'Karmaşık teknoloji',
      'Belirsiz durum'
    ],
    tradingFees: '0.25% - 0.4%',
    withdrawalFees: 'Orta',
    supportedCoins: 80,
    established: '2021',
    regulation: 'SPK Geçici Liste (Kısıtlı)',
    website: 'web3.com'
  },
  {
    id: 'whlaststop',
    name: 'WH Last Stop Varlık Alım Satım Platformu AŞ',
    oldName: 'WH Last Stop Teknoloji AŞ',
    logo: '🚏',
    safetyRating: 64,
    features: [
      'Son durak konsepti',
      'Basit kullanım',
      'Hızlı işlemler',
      'Mobil odaklı',
      'Düşük ücretler'
    ],
    drawbacks: [
      'Sınırlı özellikler',
      'Küçük pazar payı',
      'Az kripto seçeneği'
    ],
    tradingFees: '0.3% - 0.5%',
    withdrawalFees: 'Orta',
    supportedCoins: 25,
    established: '2022',
    regulation: 'SPK Geçici Liste',
    website: 'whlaststop.com'
  },
  {
    id: 'whitebit',
    name: 'Whitebit Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Whitebit Teknoloji AŞ',
    logo: '⚪',
    safetyRating: 78,
    features: [
      'Avrupa merkezli deneyim',
      'Geniş kripto seçeneği',
      'Gelişmiş trading araçları',
      'Staking imkanları',
      'Düşük ücretler'
    ],
    drawbacks: [
      'Sınırlı Türkçe destek',
      'Karmaşık arayüz',
      'Yüksek minimum tutarlar'
    ],
    tradingFees: '0.1% - 0.2%',
    withdrawalFees: 'Düşük',
    supportedCoins: 250,
    established: '2021',
    regulation: 'SPK Geçici Liste',
    website: 'whitebit.com'
  },
  {
    id: 'yenkido',
    name: 'Yenkido Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Yenkido Bilişim Hizmetleri Ticaret AŞ',
    logo: '🆕',
    safetyRating: 66,
    features: [
      'Yeni nesil platform',
      'Modern tasarım',
      'Sosyal özellikler',
      'Eğitim desteği',
      'Mobil öncelikli'
    ],
    drawbacks: [
      'Yeni platform',
      'Sınırlı geçmiş',
      'Küçük işlem hacmi'
    ],
    tradingFees: '0.25% - 0.4%',
    withdrawalFees: 'Orta',
    supportedCoins: 35,
    established: '2022',
    regulation: 'SPK Geçici Liste',
    website: 'yenkido.com'
  },
  {
    id: 'yuex',
    name: 'Yuex Kripto Varlık Alım Satım Platformu AŞ',
    oldName: 'Yuex Yazılım Teknoloji AŞ',
    logo: '🌙',
    safetyRating: 62,
    isRestricted: true,
    restrictionNote: 'Yeni müşteri kabulü durdurulmuş, sadece mevcut müşteriler işlem yapabilir',
    features: [
      'Gece odaklı trading',
      '24/7 destek',
      'Otomatik emirler',
      'API desteği',
      'Mobil uygulama'
    ],
    drawbacks: [
      'Kısıtlı operasyon',
      'Belirsiz gelecek',
      'Sınırlı özellikler'
    ],
    tradingFees: '0.25% - 0.4%',
    withdrawalFees: 'Orta',
    supportedCoins: 40,
    established: '2021',
    regulation: 'SPK Geçici Liste (Kısıtlı)',
    website: 'yuex.com'
  }
]

const custodyProviders: CustodyProvider[] = [
  {
    id: 'akbank',
    name: 'Akbank TAŞ (Saklama Başvurusu)',
    type: 'bank',
    logo: '🏛️',
    established: '1948',
    website: 'akbank.com'
  },
  {
    id: 'btcturk-custody',
    name: 'Btcturk Dijital Saklama Yönetim AŞ (Saklama Başvurusu)',
    oldName: 'Eliptik Dijital Saklama Yönetim AŞ',
    type: 'company',
    logo: '🔒',
    established: '2021',
    website: 'btcturk.com'
  },
  {
    id: 'dijital-muhafiz',
    name: 'Dijital Muhafız Teknoloji AŞ (Saklama Başvurusu)',
    type: 'company',
    logo: '🛡️',
    established: '2020',
    website: 'dijitalmuhafiz.com'
  },
  {
    id: 'istanbul-takas',
    name: 'İstanbul Takas ve Saklama Bankası AŞ (Saklama Başvurusu)',
    type: 'bank',
    logo: '🏦',
    established: '1995',
    website: 'takasbank.com.tr'
  },
  {
    id: 'misyon-bank',
    name: 'Misyon Yatırım Bankası AŞ (Saklama Başvurusu)',
    type: 'bank',
    logo: '💼',
    established: '1996',
    website: 'misvon.com.tr'
  },
  {
    id: 'paribu-custody',
    name: 'Paribu Kripto Varlık Saklama Kuruluşu AŞ (Saklama Başvurusu)',
    oldName: 'Paribu Dijital Varlık Saklama Teknolojileri AŞ',
    type: 'company',
    logo: '🟣',
    established: '2022',
    website: 'paribu.com'
  },
  {
    id: 'garanti-bank',
    name: 'Türkiye Garanti Bankası AŞ (Saklama Başvurusu)',
    type: 'bank',
    logo: '🏦',
    established: '1946',
    website: 'garanti.com.tr'
  },
  {
    id: 'isbank',
    name: 'Türkiye İş Bankası AŞ (Saklama Başvurusu)',
    type: 'bank',
    logo: '🏛️',
    established: '1924',
    website: 'isbank.com.tr'
  },
  {
    id: 'yapikredi',
    name: 'Yapı ve Kredi Bankası AŞ (Saklama Başvurusu)',
    type: 'bank',
    logo: '🏦',
    established: '1944',
    website: 'yapikredi.com.tr'
  }
]

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'rating' | 'name' | 'fees'>('rating')
  const [showRestricted, setShowRestricted] = useState(true)

  const filteredExchanges = exchanges
    .filter(exchange => {
      const matchesSearch = exchange.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exchange.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()))
      
      if (!showRestricted && exchange.isRestricted) return false
      
      return matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.safetyRating - a.safetyRating
        case 'name':
          return a.name.localeCompare(b.name)
        case 'fees':
          return parseFloat(a.tradingFees.split('%')[0]) - parseFloat(b.tradingFees.split('%')[0])
        default:
          return 0
      }
    })

  const getRatingColor = (rating: number) => {
    if (rating >= 90) return 'text-green-600 bg-green-50'
    if (rating >= 80) return 'text-blue-600 bg-blue-50'
    if (rating >= 70) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getRatingBadgeColor = (rating: number) => {
    if (rating >= 90) return 'bg-green-500'
    if (rating >= 80) return 'bg-blue-500'
    if (rating >= 70) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const activeExchanges = exchanges.filter(e => !e.isRestricted)
  const restrictedExchanges = exchanges.filter(e => e.isRestricted)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-6">
              <span className="text-4xl">🇹🇷</span>
              <Shield className="h-12 w-12" />
              <span className="text-4xl">₿</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Türkiye Kripto Para Borsaları
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              SPK Geçici Listesindeki borsaların kapsamlı analizi ve güvenlik puanları
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Shield className="h-4 w-4 mr-1" />
                SPK Geçici Liste
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <TrendingUp className="h-4 w-4 mr-1" />
                Güncel Analiz
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Star className="h-4 w-4 mr-1" />
                Güvenlik Puanları
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Important Notice */}
      <section className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800 mb-2">Önemli Bilgilendirme</h3>
              <p className="text-amber-700 text-sm leading-relaxed">
                Bu liste, 6362 Sayılı Sermaye Piyasası Kanunu'nun geçici 11. maddesi uyarınca faaliyette bulunacaklarını beyan eden kuruluşlara dair kamunun bilgilendirilmesi amacıyla oluşturulmuştur. 
                Bu listede yer alan kuruluşların ilgili mevzuat uyarınca yetkilendirildiği anlamına gelmemektedir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Borsa adı veya özellik ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={sortBy === 'rating' ? 'default' : 'outline'}
                onClick={() => setSortBy('rating')}
                size="sm"
              >
                Güvenlik Puanı
              </Button>
              <Button
                variant={sortBy === 'name' ? 'default' : 'outline'}
                onClick={() => setSortBy('name')}
                size="sm"
              >
                İsim
              </Button>
              <Button
                variant={sortBy === 'fees' ? 'default' : 'outline'}
                onClick={() => setSortBy('fees')}
                size="sm"
              >
                Ücretler
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{activeExchanges.length}</div>
              <div className="text-sm text-gray-600">Aktif Borsa</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{restrictedExchanges.length}</div>
              <div className="text-sm text-gray-600">Kısıtlı Borsa</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {activeExchanges.filter(e => e.safetyRating >= 80).length}
              </div>
              <div className="text-sm text-gray-600">Güvenli Borsa</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{custodyProviders.length}</div>
              <div className="text-sm text-gray-600">Saklama Kuruluşu</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Exchanges Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Kripto Varlık Alım Satım Platformları</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExchanges.map((exchange) => (
              <Card key={exchange.id} className={`hover:shadow-xl transition-all duration-300 border-0 shadow-lg ${exchange.isRestricted ? 'opacity-75 border-l-4 border-l-amber-500' : ''}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{exchange.logo}</div>
                      <div>
                        <CardTitle className="text-lg leading-tight">{exchange.name.split(' ').slice(0, 3).join(' ')}</CardTitle>
                        <CardDescription className="text-xs">
                          {exchange.oldName && (
                            <span className="text-gray-500">Eski: {exchange.oldName.split(' ').slice(0, 2).join(' ')}</span>
                          )}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRatingColor(exchange.safetyRating)}`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${getRatingBadgeColor(exchange.safetyRating)}`}></div>
                        {exchange.safetyRating}/100
                      </div>
                    </div>
                  </div>
                  {exchange.isRestricted && (
                    <div className="mt-2">
                      <Badge variant="destructive" className="text-xs">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Kısıtlı
                      </Badge>
                      <p className="text-xs text-amber-700 mt-1">{exchange.restrictionNote}</p>
                    </div>
                  )}
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Key Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">İşlem Ücreti</div>
                      <div className="font-medium">{exchange.tradingFees}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Desteklenen Coin</div>
                      <div className="font-medium">{exchange.supportedCoins}+</div>
                    </div>
                  </div>

                  {/* Regulation Status */}
                  <div className="flex items-center gap-2">
                    <Badge variant={exchange.regulation.includes('SPK') ? 'default' : 'secondary'}>
                      {exchange.regulation}
                    </Badge>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-medium text-green-700 mb-2 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      Öne Çıkan Özellikler
                    </h4>
                    <ul className="space-y-1">
                      {exchange.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Drawbacks */}
                  <div>
                    <h4 className="font-medium text-red-700 mb-2 flex items-center gap-1">
                      <XCircle className="h-4 w-4" />
                      Dikkat Edilmesi Gerekenler
                    </h4>
                    <ul className="space-y-1">
                      {exchange.drawbacks.slice(0, 2).map((drawback, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          {drawback}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Website Link */}
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => window.open(`https://${exchange.website}`, '_blank')}
                    disabled={exchange.isRestricted}
                  >
                    {exchange.isRestricted ? 'Kısıtlı Erişim' : 'Siteyi Ziyaret Et'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Custody Providers Section */}
      <section className="max-w-7xl mx-auto px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            Saklama Kuruluşları (Başvuru Aşamasında)
          </h2>
          <p className="text-gray-600 mb-6">
            Kripto varlık saklama hizmeti vermek için SPK'ya başvuru yapmış kuruluşlar
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {custodyProviders.map((provider) => (
              <Card key={provider.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{provider.logo}</div>
                    <div>
                      <CardTitle className="text-lg leading-tight">{provider.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {provider.oldName && (
                          <span className="text-gray-500">Eski: {provider.oldName}</span>
                        )}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant={provider.type === 'bank' ? 'default' : 'secondary'}>
                      {provider.type === 'bank' ? 'Banka' : 'Teknoloji Şirketi'}
                    </Badge>
                  </div>
                  
                  <div className="text-sm">
                    <div className="text-gray-600">Kuruluş Yılı</div>
                    <div className="font-medium">{provider.established}</div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => window.open(`https://${provider.website}`, '_blank')}
                  >
                    Kurumsal Site
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <AlertTriangle className="h-6 w-6 text-yellow-400" />
              <h3 className="text-xl font-semibold">Önemli Uyarı</h3>
            </div>
            <p className="text-gray-300 max-w-4xl mx-auto mb-6">
              Bu site sadece bilgilendirme amaçlıdır ve yatırım tavsiyesi niteliği taşımaz. 
              Kripto para yatırımları yüksek risk içerir ve değer kaybına uğrayabilir. 
              Yatırım yapmadan önce kendi araştırmanızı yapın ve risk toleransınızı değerlendirin.
            </p>
            <div className="border-t border-gray-700 pt-6">
              <p className="text-sm text-gray-400">
                © 2025 Türkiye Kripto Para Borsaları Analizi. Bu proje SPK veya herhangi bir resmi kurum tarafından desteklenmemektedir.
                <br />
                Son güncelleme: Temmuz 2025 - SPK Geçici Liste verilerine dayanmaktadır.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App