// Cambia tus estados a esto:
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [submissions, setSubmissions] = useState<UserSubmission[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);

  useEffect(() => {
    const s = localStorage.getItem('glow_shopping_list');
    if (s) setShoppingList(JSON.parse(s));
    
    const sub = localStorage.getItem('glow_submissions');
    if (sub) setSubmissions(JSON.parse(sub));
    
    const prof = localStorage.getItem('glow_profile');
    if (prof) setUserProfile(JSON.parse(prof));
  }, []);