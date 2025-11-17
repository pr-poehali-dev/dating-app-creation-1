import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: number;
  name: string;
  age: number;
  bio: string;
  image: string;
  verified: boolean;
  interests: string[];
  distance: number;
}

const mockProfiles: Profile[] = [
  {
    id: 1,
    name: 'Анна',
    age: 25,
    bio: 'Люблю путешествия, йогу и хорошую музыку. Ищу интересного собеседника для прогулок по городу и совместных приключений.',
    image: 'https://cdn.poehali.dev/projects/64fedfbf-e528-4755-aa8e-ca37933d277c/files/41fe328f-53f9-4178-9421-4dc4a6c65cb4.jpg',
    verified: true,
    interests: ['Путешествия', 'Йога', 'Музыка', 'Фотография'],
    distance: 2
  },
  {
    id: 2,
    name: 'Максим',
    age: 28,
    bio: 'Разработчик и любитель активного отдыха. В свободное время занимаюсь скалолазанием и готовлю новые блюда.',
    image: 'https://cdn.poehali.dev/projects/64fedfbf-e528-4755-aa8e-ca37933d277c/files/14532c1e-f014-47d7-8035-8b9485782542.jpg',
    verified: true,
    interests: ['Спорт', 'Кулинария', 'Технологии', 'Кино'],
    distance: 5
  },
  {
    id: 3,
    name: 'Елена',
    age: 23,
    bio: 'Художница и мечтательница. Обожаю кофе, книги и долгие разговоры о жизни. Ищу того, кто разделит мои увлечения.',
    image: 'https://cdn.poehali.dev/projects/64fedfbf-e528-4755-aa8e-ca37933d277c/files/c753f3e8-6aab-4ef2-956e-b491ecfe7e71.jpg',
    verified: false,
    interests: ['Искусство', 'Литература', 'Кофе', 'Прогулки'],
    distance: 3
  }
];

export default function Index() {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [likedProfiles, setLikedProfiles] = useState<Profile[]>([]);
  const [activeTab, setActiveTab] = useState('discover');
  const { toast } = useToast();

  const [userProfile, setUserProfile] = useState({
    name: 'Вы',
    age: 25,
    bio: 'Расскажите о себе...',
    interests: ['Путешествия', 'Музыка']
  });

  const [filters, setFilters] = useState({
    ageRange: [18, 35],
    maxDistance: 10,
    verified: false
  });

  const currentProfile = mockProfiles[currentProfileIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (!currentProfile) return;

    setSwipeDirection(direction);
    
    if (direction === 'right') {
      setLikedProfiles([...likedProfiles, currentProfile]);
      toast({
        title: '💖 Лайк отправлен!',
        description: `Вы понравились ${currentProfile.name}`,
        duration: 2000
      });
    }

    setTimeout(() => {
      setSwipeDirection(null);
      if (currentProfileIndex < mockProfiles.length - 1) {
        setCurrentProfileIndex(currentProfileIndex + 1);
      } else {
        setCurrentProfileIndex(0);
        toast({
          title: '🎉 Вы просмотрели все профили',
          description: 'Скоро появятся новые анкеты!',
          duration: 3000
        });
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <header className="mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-love rounded-full flex items-center justify-center">
                <Icon name="Heart" className="text-white" size={20} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-love bg-clip-text text-transparent">
                LoveMatch
              </h1>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-pink-100"
                onClick={() => setShowSettings(true)}
              >
                <Icon name="Settings" size={20} />
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur">
              <TabsTrigger value="discover" className="data-[state=active]:bg-gradient-pink data-[state=active]:text-white">
                <Icon name="Flame" size={16} className="mr-2" />
                Поиск
              </TabsTrigger>
              <TabsTrigger value="matches" className="data-[state=active]:bg-gradient-purple data-[state=active]:text-white">
                <Icon name="Heart" size={16} className="mr-2" />
                Лайки
              </TabsTrigger>
              <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-love data-[state=active]:text-white">
                <Icon name="User" size={16} className="mr-2" />
                Профиль
              </TabsTrigger>
            </TabsList>

            <TabsContent value="discover" className="mt-6">
              {currentProfile ? (
                <div className="animate-scale-in">
                  <Card 
                    className={`relative overflow-hidden bg-white shadow-2xl border-0 card-swipe ${
                      swipeDirection === 'left' ? 'swipe-left' : swipeDirection === 'right' ? 'swipe-right' : ''
                    }`}
                  >
                    <div className="relative h-[500px]">
                      <img 
                        src={currentProfile.image} 
                        alt={currentProfile.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      
                      <div className="absolute top-4 right-4">
                        {currentProfile.verified && (
                          <Badge className="bg-blue-500 text-white border-0 animate-pulse-slow">
                            <Icon name="CheckCircle" size={14} className="mr-1" />
                            Верифицирован
                          </Badge>
                        )}
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="flex items-center gap-2 mb-2">
                          <h2 className="text-3xl font-bold">
                            {currentProfile.name}, {currentProfile.age}
                          </h2>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3 text-white/90">
                          <Icon name="MapPin" size={16} />
                          <span className="text-sm">{currentProfile.distance} км от вас</span>
                        </div>

                        <p className="text-sm mb-3 text-white/90 line-clamp-2">
                          {currentProfile.bio}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {currentProfile.interests.map((interest, idx) => (
                            <Badge 
                              key={idx} 
                              variant="secondary"
                              className="bg-white/20 backdrop-blur text-white border-white/30"
                            >
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>

                  <div className="flex justify-center gap-4 mt-6">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full w-16 h-16 border-2 border-red-300 hover:bg-red-50 hover:border-red-400 hover:scale-110 transition-all shadow-lg"
                      onClick={() => handleSwipe('left')}
                    >
                      <Icon name="X" size={28} className="text-red-500" />
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full w-16 h-16 border-2 border-blue-300 hover:bg-blue-50 hover:border-blue-400 hover:scale-110 transition-all shadow-lg"
                      onClick={() => setShowProfile(true)}
                    >
                      <Icon name="Info" size={24} className="text-blue-500" />
                    </Button>

                    <Button
                      size="lg"
                      className="rounded-full w-20 h-20 bg-gradient-love hover:scale-110 transition-all shadow-xl border-0"
                      onClick={() => handleSwipe('right')}
                    >
                      <Icon name="Heart" size={32} className="text-white" />
                    </Button>
                  </div>
                </div>
              ) : (
                <Card className="p-12 text-center bg-white/80 backdrop-blur">
                  <Icon name="Users" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Новые профили скоро появятся!</p>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="matches" className="mt-6">
              <div className="space-y-4 animate-fade-in">
                {likedProfiles.length > 0 ? (
                  likedProfiles.map((profile) => (
                    <Card key={profile.id} className="p-4 bg-white/80 backdrop-blur hover:shadow-lg transition-all cursor-pointer">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-16 h-16 border-2 border-pink-200">
                          <AvatarImage src={profile.image} />
                          <AvatarFallback>{profile.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{profile.name}, {profile.age}</h3>
                            {profile.verified && (
                              <Icon name="CheckCircle" size={16} className="text-blue-500" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-1">{profile.bio}</p>
                        </div>
                        <Button size="icon" className="bg-gradient-pink border-0 rounded-full">
                          <Icon name="MessageCircle" size={20} />
                        </Button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <Card className="p-12 text-center bg-white/80 backdrop-blur">
                    <Icon name="HeartCrack" size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Пока нет совпадений</p>
                    <p className="text-sm text-muted-foreground mt-2">Ставьте лайки, чтобы найти свою пару!</p>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="profile" className="mt-6">
              <Card className="p-6 bg-white/80 backdrop-blur animate-fade-in">
                <div className="text-center mb-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-pink-200">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
                    <AvatarFallback>Вы</AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold mb-1">{userProfile.name}, {userProfile.age}</h2>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Icon name="Edit" size={16} className="mr-2" />
                    Редактировать профиль
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>О себе</Label>
                    <Textarea 
                      value={userProfile.bio}
                      onChange={(e) => setUserProfile({...userProfile, bio: e.target.value})}
                      className="mt-2"
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label className="mb-3 block">Интересы</Label>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.interests.map((interest, idx) => (
                        <Badge key={idx} className="bg-gradient-purple border-0 text-white">
                          {interest}
                          <Icon name="X" size={14} className="ml-1 cursor-pointer" />
                        </Badge>
                      ))}
                      <Button variant="outline" size="sm" className="rounded-full">
                        <Icon name="Plus" size={14} className="mr-1" />
                        Добавить
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon name="Shield" size={20} className="text-blue-500" />
                        <div>
                          <p className="font-medium">Верификация профиля</p>
                          <p className="text-xs text-muted-foreground">Повысьте доверие</p>
                        </div>
                      </div>
                      <Button className="bg-gradient-purple border-0">
                        Пройти
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </header>

        <Dialog open={showProfile} onOpenChange={setShowProfile}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Профиль</DialogTitle>
            </DialogHeader>
            {currentProfile && (
              <div className="space-y-4">
                <div className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={currentProfile.image} />
                  </Avatar>
                  <h3 className="text-xl font-bold mb-1">
                    {currentProfile.name}, {currentProfile.age}
                  </h3>
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Icon name="MapPin" size={16} />
                    <span className="text-sm">{currentProfile.distance} км от вас</span>
                  </div>
                </div>

                <div>
                  <Label className="text-muted-foreground">О себе</Label>
                  <p className="mt-2">{currentProfile.bio}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground mb-2 block">Интересы</Label>
                  <div className="flex flex-wrap gap-2">
                    {currentProfile.interests.map((interest, idx) => (
                      <Badge key={idx} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      setShowProfile(false);
                      handleSwipe('left');
                    }}
                  >
                    <Icon name="X" size={16} className="mr-2" />
                    Пропустить
                  </Button>
                  <Button 
                    className="flex-1 bg-gradient-love border-0"
                    onClick={() => {
                      setShowProfile(false);
                      handleSwipe('right');
                    }}
                  >
                    <Icon name="Heart" size={16} className="mr-2" />
                    Лайк
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Настройки и фильтры</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div>
                <Label className="mb-4 block">
                  Возраст: {filters.ageRange[0]} - {filters.ageRange[1]} лет
                </Label>
                <Slider
                  value={filters.ageRange}
                  onValueChange={(value) => setFilters({...filters, ageRange: value})}
                  min={18}
                  max={60}
                  step={1}
                  className="mb-2"
                />
              </div>

              <div>
                <Label className="mb-4 block">
                  Максимальное расстояние: {filters.maxDistance} км
                </Label>
                <Slider
                  value={[filters.maxDistance]}
                  onValueChange={(value) => setFilters({...filters, maxDistance: value[0]})}
                  min={1}
                  max={100}
                  step={1}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <Label className="font-medium">Только верифицированные</Label>
                  <p className="text-xs text-muted-foreground">Показывать проверенные профили</p>
                </div>
                <Switch
                  checked={filters.verified}
                  onCheckedChange={(checked) => setFilters({...filters, verified: checked})}
                />
              </div>

              <Button 
                className="w-full bg-gradient-purple border-0"
                onClick={() => {
                  setShowSettings(false);
                  toast({
                    title: '✅ Настройки сохранены',
                    description: 'Фильтры применены к поиску'
                  });
                }}
              >
                Применить
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
