import { Exercise } from '@/types';

export const exercises: Exercise[] = [
  {
    id: '1',
    title: 'Nefes Egzersizi 1',
    description: 'Diyafram nefes tekniği ile akciğer kapasitesini artırın.',
    longDescription:
      'Diyafram nefes tekniği, KOAH hastalarının en temel egzersizlerinden biridir. Bu egzersiz, nefes alma kapasitesini artırarak günlük yaşam kalitesini iyileştirmeyi hedefler.\n\nNasıl yapılır:\n1. Rahat bir pozisyonda oturun veya sırt üstü yatın.\n2. Bir elinizi göğsünüze, diğerini karnınıza koyun.\n3. Burnunuzdan yavaşça nefes alın, karnınızın şiştiğini hissedin.\n4. Dudaklarınızı büzerek ağızdan yavaşça nefes verin.\n5. Bu döngüyü 5-10 dakika tekrarlayın.\n\nGünde en az 2 kez yapmanız önerilir.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
    category: 'Nefes',
    duration: '10 dk',
  },
  {
    id: '2',
    title: 'Isınma Egzersizi 1',
    description: 'Üst vücut ısınma hareketleri ile kasları hazırlayın.',
    longDescription:
      'Üst vücut ısınma egzersizi, KOAH hastalarının egzersiz öncesi kaslarını hazırlaması için tasarlanmıştır. Omuz ve kol hareketleri ile kan dolaşımını artırır.\n\nNasıl yapılır:\n1. Ayakta veya oturarak başlayın.\n2. Kollarınızı yanlara açarak yavaşça yukarı kaldırın.\n3. Omuzlarınızı öne ve arkaya doğru döndürün.\n4. Her hareketi 8-10 kez tekrarlayın.\n5. Hareketler sırasında düzenli nefes almaya dikkat edin.\n\nEgzersiz öncesi mutlaka yapılmalıdır.',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800',
    category: 'Isınma',
    duration: '8 dk',
  },
  {
    id: '3',
    title: 'Nefes Egzersizi 2',
    description: 'Büzük dudak nefes tekniği ile nefes kontrolünü geliştirin.',
    longDescription:
      'Büzük dudak nefes tekniği, havayollarını açık tutmaya yardımcı olur ve nefes darlığı hissini azaltır. KOAH hastalarının günlük yaşamda kullanabilecekleri önemli bir tekniktir.\n\nNasıl yapılır:\n1. Rahat bir pozisyonda oturun.\n2. Burnunuzdan 2 saniye boyunca nefes alın.\n3. Dudaklarınızı ıslık çalar gibi büzün.\n4. Ağızdan 4 saniye boyunca yavaşça nefes verin.\n5. Nefes verme süreniz, nefes alma sürenizin iki katı olmalıdır.\n\nGün içinde nefes darlığı hissettiğinizde uygulayabilirsiniz.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
    category: 'Nefes',
    duration: '12 dk',
  },
  {
    id: '4',
    title: 'Yürüyüş Egzersizi',
    description: 'Tempolu yürüyüş ile dayanıklılığınızı artırın.',
    longDescription:
      'Yürüyüş, KOAH hastaları için en güvenli ve etkili aerobik egzersizlerden biridir. Düzenli yürüyüş, kalp ve akciğer fonksiyonlarını güçlendirir.\n\nNasıl yapılır:\n1. Düz ve güvenli bir alanda yürümeye başlayın.\n2. İlk 2 dakika yavaş tempoda ısının.\n3. Ardından orta tempoda 10-15 dakika yürüyün.\n4. Son 2 dakika tekrar yavaşlayarak soğuyun.\n5. Nefes darlığı hissederseniz durun ve büzük dudak nefes yapın.\n\nHaftada en az 3-4 gün yapmanız önerilir.',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800',
    category: 'Kardiyovasküler',
    duration: '20 dk',
  },
  {
    id: '5',
    title: 'Isınma Egzersizi 2',
    description: 'Alt vücut ısınma hareketleri ile bacak kaslarını güçlendirin.',
    longDescription:
      'Alt vücut ısınma egzersizi, bacak kaslarını güçlendirmeye ve esnekliği artırmaya yardımcı olur. Özellikle yürüyüş ve merdiven çıkma gibi günlük aktiviteleri kolaylaştırır.\n\nNasıl yapılır:\n1. Bir sandalyenin arkasına tutunarak ayakta durun.\n2. Sağ bacağınızı yavaşça öne kaldırın ve indirin.\n3. Sol bacakla aynı hareketi tekrarlayın.\n4. Her bacak için 10 tekrar yapın.\n5. Ardından parmak uçlarında yükselme yapın (10 tekrar).\n\nDengenizi kaybetmemek için sandalyeye tutunmayı unutmayın.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800',
    category: 'Isınma',
    duration: '10 dk',
  },
  {
    id: '6',
    title: 'Gevşeme Egzersizi',
    description: 'Vücut gevşetme teknikleri ile stresi azaltın.',
    longDescription:
      'Gevşeme egzersizi, KOAH hastalarının stres ve anksiyetelerini yönetmelerine yardımcı olur. Nefes darlığı sırasında panik hissini azaltır.\n\nNasıl yapılır:\n1. Rahat bir pozisyonda oturun veya yatın.\n2. Gözlerinizi kapatın.\n3. Ayak parmaklarınızdan başlayarak vücudunuzu kasan ve gevşeten hareketler yapın.\n4. Her kas grubunu 5 saniye kasın, ardından 10 saniye gevşetin.\n5. Tüm vücudu tarayarak yukarı doğru devam edin.\n\nUyku öncesi yapmanız iyi bir dinlenme sağlar.',
    image: 'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?w=800',
    category: 'Gevşeme',
    duration: '15 dk',
  },
];
