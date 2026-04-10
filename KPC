import { useState, useEffect, useRef, useCallback, memo } from "react";

/* ═══════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════ */
const LOGO = "data:image/png;base64,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";

const COUNTRIES = ["Italia","Albania","Algeria","Andorra","Argentina","Australia","Austria","Belgio","Bosnia","Brasile","Bulgaria","Canada","Cile","Cina","Cipro","Colombia","Corea del Sud","Croazia","Cuba","Danimarca","Ecuador","Egitto","Emirati Arabi","Estonia","Filippine","Finlandia","Francia","Georgia","Germania","Ghana","Giamaica","Giappone","Grecia","India","Indonesia","Irlanda","Islanda","Israele","Lettonia","Lituania","Lussemburgo","Malesia","Malta","Marocco","Messico","Monaco","Montenegro","Norvegia","Nuova Zelanda","Paesi Bassi","Peru","Polonia","Portogallo","Qatar","Regno Unito","Rep. Ceca","Romania","Russia","Serbia","Slovacchia","Slovenia","Spagna","Stati Uniti","Sudafrica","Svezia","Svizzera","Thailandia","Tunisia","Turchia","Ucraina","Ungheria","Uruguay","Venezuela"];
const PROVS = "Agrigento-AG,Alessandria-AL,Ancona-AN,Aosta-AO,Ascoli Piceno-AP,L'Aquila-AQ,Arezzo-AR,Asti-AT,Avellino-AV,Bari-BA,Bergamo-BG,Biella-BI,Belluno-BL,Benevento-BN,Bologna-BO,Brindisi-BR,Brescia-BS,Barletta-BT,Bolzano-BZ,Cagliari-CA,Campobasso-CB,Caserta-CE,Chieti-CH,Caltanissetta-CL,Cuneo-CN,Como-CO,Cremona-CR,Cosenza-CS,Catania-CT,Catanzaro-CZ,Enna-EN,Ferrara-FE,Foggia-FG,Firenze-FI,Fermo-FM,Frosinone-FR,Genova-GE,Gorizia-GO,Grosseto-GR,Imperia-IM,Isernia-IS,Crotone-KR,Lecco-LC,Lecce-LE,Livorno-LI,Lodi-LO,Latina-LT,Lucca-LU,Monza-MB,Macerata-MC,Messina-ME,Milano-MI,Mantova-MN,Modena-MO,Massa-MS,Matera-MT,Napoli-NA,Novara-NO,Nuoro-NU,Oristano-OR,Palermo-PA,Piacenza-PC,Padova-PD,Pescara-PE,Perugia-PG,Pisa-PI,Pordenone-PN,Prato-PO,Parma-PR,Pistoia-PT,Pesaro-PU,Pavia-PV,Potenza-PZ,Ravenna-RA,Reggio Calabria-RC,Reggio Emilia-RE,Ragusa-RG,Rieti-RI,Roma-RM,Rimini-RN,Rovigo-RO,Salerno-SA,Siena-SI,Sondrio-SO,La Spezia-SP,Siracusa-SR,Sassari-SS,Savona-SV,Taranto-TA,Teramo-TE,Trento-TN,Torino-TO,Trapani-TP,Terni-TR,Trieste-TS,Treviso-TV,Udine-UD,Varese-VA,Verbania-VB,Vercelli-VC,Venezia-VE,Vicenza-VI,Verona-VR,Viterbo-VT,Vibo Valentia-VV".split(",").map(p => { const s = p.split("-"); return { name: s[0], code: s[1], label: s[0] + " - " + s[1] }; });
const SIC = ["PA","CT","ME","AG","CL","EN","RG","SR","TP"];
const SAR = ["SS","NU","CA","OR","SU"];

const IT_CITIES = {"AG":["Agrigento","Sciacca","Licata","Canicatti","Favara","Ribera","Porto Empedocle"],"AL":["Alessandria","Casale Monferrato","Novi Ligure","Tortona","Acqui Terme","Ovada","Valenza"],"AN":["Ancona","Jesi","Senigallia","Fabriano","Osimo","Falconara Marittima","Chiaravalle"],"AO":["Aosta","Courmayeur","Saint-Vincent","Chatillon"],"AP":["Ascoli Piceno","San Benedetto del Tronto","Grottammare","Offida"],"AQ":["L'Aquila","Avezzano","Sulmona","Celano","Tagliacozzo"],"AR":["Arezzo","Cortona","Sansepolcro","Montevarchi","Bibbiena"],"AT":["Asti","Nizza Monferrato","Canelli"],"AV":["Avellino","Ariano Irpino","Atripalda","Mercogliano"],"BA":["Bari","Altamura","Molfetta","Bitonto","Monopoli","Corato","Gravina in Puglia","Ruvo di Puglia","Modugno","Triggiano","Conversano","Gioia del Colle"],"BG":["Bergamo","Treviglio","Seriate","Dalmine","Romano di Lombardia","Caravaggio"],"BI":["Biella","Cossato","Trivero"],"BL":["Belluno","Feltre","Sedico","Ponte nelle Alpi"],"BN":["Benevento","Montesarchio","Telese Terme","San Giorgio del Sannio"],"BO":["Bologna","Imola","Casalecchio di Reno","San Lazzaro di Savena","Castel Maggiore","Budrio","San Giovanni in Persiceto","Zola Predosa"],"BR":["Brindisi","Fasano","Ostuni","Francavilla Fontana","Mesagne","Ceglie Messapica","San Pietro Vernotico"],"BS":["Brescia","Desenzano del Garda","Montichiari","Lumezzane","Ghedi","Palazzolo sull'Oglio","Chiari"],"BT":["Barletta","Andria","Trani","Bisceglie","Canosa di Puglia","Margherita di Savoia"],"BZ":["Bolzano","Merano","Bressanone","Laives","Brunico"],"CA":["Cagliari","Quartu Sant'Elena","Selargius","Assemini","Capoterra","Monserrato"],"CB":["Campobasso","Termoli","Isernia","Larino"],"CE":["Caserta","Aversa","Marcianise","Maddaloni","Santa Maria Capua Vetere","Mondragone","Sessa Aurunca","Casal di Principe"],"CH":["Chieti","Lanciano","Vasto","Ortona","Francavilla al Mare","San Giovanni Teatino","San Salvo","Guardiagrele","Atessa"],"CL":["Caltanissetta","Gela","Niscemi","Mussomeli","Riesi"],"CN":["Cuneo","Alba","Bra","Fossano","Mondovi","Saluzzo","Savigliano"],"CO":["Como","Cantu","Erba","Mariano Comense","Olgiate Comasco"],"CR":["Cremona","Crema","Casalmaggiore","Soresina"],"CS":["Cosenza","Rende","Corigliano-Rossano","Castrovillari","Paola","Amantea","Acri"],"CT":["Catania","Acireale","Misterbianco","Paterna","Gravina di Catania","Giarre","Caltagirone","Adrano","Biancavilla","Belpasso"],"CZ":["Catanzaro","Lamezia Terme","Soverato","Sellia Marina"],"EN":["Enna","Piazza Armerina","Nicosia","Leonforte"],"FE":["Ferrara","Cento","Comacchio","Argenta","Copparo"],"FG":["Foggia","San Severo","Cerignola","Manfredonia","Lucera","San Giovanni Rotondo","Vieste"],"FI":["Firenze","Empoli","Scandicci","Sesto Fiorentino","Campi Bisenzio","Bagno a Ripoli","Pontassieve","Figline Valdarno"],"FM":["Fermo","Porto Sant'Elpidio","Porto San Giorgio","Sant'Elpidio a Mare"],"FR":["Frosinone","Cassino","Alatri","Sora","Ceccano","Ferentino","Veroli","Anagni"],"GE":["Genova","Rapallo","Chiavari","Sestri Levante","Recco","Lavagna","Santa Margherita Ligure"],"GO":["Gorizia","Monfalcone","Gradisca d'Isonzo"],"GR":["Grosseto","Follonica","Orbetello","Massa Marittima","Monte Argentario"],"IM":["Imperia","Sanremo","Ventimiglia","Bordighera","Diano Marina","Taggia"],"IS":["Isernia","Venafro","Agnone"],"KR":["Crotone","Isola di Capo Rizzuto","Cirò Marina","Cutro"],"LC":["Lecco","Merate","Calolziocorte","Mandello del Lario","Valmadrera"],"LE":["Lecce","Nardo","Gallipoli","Maglie","Galatina","Copertino","Casarano","Tricase","Otranto"],"LI":["Livorno","Piombino","Rosignano Marittimo","Cecina","Portoferraio","Collesalvetti"],"LO":["Lodi","Codogno","Casalpusterlengo","Sant'Angelo Lodigiano"],"LT":["Latina","Aprilia","Terracina","Fondi","Formia","Gaeta","Cisterna di Latina","Minturno","Sezze"],"LU":["Lucca","Viareggio","Camaiore","Capannori","Pietrasanta","Forte dei Marmi","Massarosa"],"MB":["Monza","Desio","Lissone","Seregno","Brugherio","Cesano Maderno","Giussano","Muggio"],"MC":["Macerata","Civitanova Marche","Recanati","Tolentino","Corridonia","Porto Recanati"],"ME":["Messina","Milazzo","Barcellona Pozzo di Gotto","Patti","Capo d'Orlando","Taormina","Lipari"],"MI":["Milano","Sesto San Giovanni","Cinisello Balsamo","Rho","Legnano","Cologno Monzese","Paderno Dugnano","Pioltello","Corsico","Rozzano","Segrate","San Donato Milanese","Abbiategrasso","Magenta","Melzo","Gorgonzola"],"MN":["Mantova","Castiglione delle Stiviere","Suzzara","Viadana","Gonzaga"],"MO":["Modena","Carpi","Sassuolo","Formigine","Castelfranco Emilia","Vignola","Maranello","Mirandola"],"MS":["Massa","Carrara","Aulla","Pontremoli"],"MT":["Matera","Policoro","Pisticci","Bernalda"],"NA":["Napoli","Giugliano in Campania","Torre del Greco","Pozzuoli","Casoria","Castellammare di Stabia","Afragola","Marano di Napoli","Ercolano","Portici","San Giorgio a Cremano","Torre Annunziata","Nola","Sorrento","Ischia"],"NO":["Novara","Borgomanero","Trecate","Arona","Oleggio","Galliate"],"NU":["Nuoro","Siniscola","Macomer","Tortoli","Dorgali"],"OR":["Oristano","Terralba","Cabras","Bosa"],"PA":["Palermo","Bagheria","Monreale","Carini","Partinico","Misilmeri","Termini Imerese","Cefalu","Villabate"],"PC":["Piacenza","Fiorenzuola d'Arda","Castel San Giovanni","Rottofreno"],"PD":["Padova","Abano Terme","Albignasego","Selvazzano Dentro","Cittadella","Este","Vigonza","Cadoneghe","Monselice"],"PE":["Pescara","Montesilvano","Spoltore","Cepagatti","Penne","Citta Sant'Angelo","Collecorvino","Loreto Aprutino","Pianella"],"PG":["Perugia","Foligno","Citta di Castello","Spoleto","Gubbio","Todi","Assisi","Bastia Umbra","Corciano"],"PI":["Pisa","Cascina","San Giuliano Terme","Pontedera","San Miniato","Volterra"],"PN":["Pordenone","Sacile","Cordenons","Maniago","Azzano Decimo"],"PO":["Prato","Montemurlo","Carmignano","Poggio a Caiano"],"PR":["Parma","Fidenza","Salsomaggiore Terme","Collecchio","Langhirano"],"PT":["Pistoia","Montecatini Terme","Quarrata","Pescia","Monsummano Terme","Agliana"],"PU":["Pesaro","Urbino","Fano","Fossombrone","Gabicce Mare","Mondolfo","Cagli"],"PV":["Pavia","Vigevano","Voghera","Mortara","Stradella"],"PZ":["Potenza","Melfi","Lauria","Rionero in Vulture","Venosa"],"RA":["Ravenna","Faenza","Lugo","Cervia","Russi","Bagnacavallo"],"RC":["Reggio Calabria","Gioia Tauro","Palmi","Siderno","Locri","Melito di Porto Salvo","Taurianova","Cittanova","Villa San Giovanni"],"RE":["Reggio Emilia","Correggio","Scandiano","Guastalla","Casalgrande","Rubiera","Castellarano"],"RG":["Ragusa","Vittoria","Modica","Comiso","Scicli","Ispica","Pozzallo"],"RI":["Rieti","Fara in Sabina","Cittaducale"],"RM":["Roma","Guidonia Montecelio","Fiumicino","Tivoli","Velletri","Anzio","Nettuno","Ardea","Pomezia","Ciampino","Albano Laziale","Marino","Frascati","Monterotondo","Ladispoli","Cerveteri","Civitavecchia","Bracciano","Colleferro","Palestrina","Subiaco"],"RN":["Rimini","Riccione","Bellaria-Igea Marina","Santarcangelo di Romagna","Cattolica","Misano Adriatico","Coriano"],"RO":["Rovigo","Adria","Badia Polesine","Lendinara","Porto Viro"],"SA":["Salerno","Nocera Inferiore","Cava de' Tirreni","Battipaglia","Eboli","Scafati","Pagani","Angri","Sarno","Agropoli","Capaccio Paestum","Pontecagnano","Amalfi","Positano","Ravello"],"SI":["Siena","Poggibonsi","Colle di Val d'Elsa","Montepulciano","Chianciano Terme","Montalcino"],"SO":["Sondrio","Morbegno","Tirano","Bormio","Livigno","Chiavenna"],"SP":["La Spezia","Sarzana","Lerici","Santo Stefano di Magra","Portovenere"],"SR":["Siracusa","Augusta","Noto","Avola","Lentini","Floridia","Pachino"],"SS":["Sassari","Alghero","Olbia","Porto Torres","Tempio Pausania","La Maddalena","Arzachena","Porto Cervo"],"SU":["Carbonia","Iglesias","Villacidro","Sanluri","San Gavino Monreale"],"SV":["Savona","Albenga","Finale Ligure","Loano","Varazze","Pietra Ligure","Spotorno"],"TA":["Taranto","Martina Franca","Massafra","Grottaglie","Manduria","Castellaneta","Ginosa","Laterza"],"TE":["Teramo","Giulianova","Roseto degli Abruzzi","Martinsicuro","Alba Adriatica","Pineto","Silvi","Atri","Tortoreto","Mosciano Sant'Angelo","Nereto","Colonnella"],"TN":["Trento","Rovereto","Pergine Valsugana","Riva del Garda","Arco","Mori"],"TO":["Torino","Moncalieri","Collegno","Rivoli","Nichelino","Settimo Torinese","Grugliasco","Chieri","Pinerolo","Venaria Reale","Chivasso","Ivrea","Carmagnola","Orbassano","Beinasco","Alpignano","Leinì"],"TP":["Trapani","Marsala","Mazara del Vallo","Alcamo","Castelvetrano","Erice","Pantelleria","Favignana","San Vito Lo Capo"],"TR":["Terni","Orvieto","Narni","Amelia"],"TS":["Trieste","Muggia","Duino Aurisina"],"TV":["Treviso","Conegliano","Castelfranco Veneto","Montebelluna","Vittorio Veneto","Mogliano Veneto","Paese","Oderzo"],"UD":["Udine","Codroipo","Cervignano del Friuli","Cividale del Friuli","Gemona del Friuli","Latisana","Tolmezzo"],"VA":["Varese","Busto Arsizio","Gallarate","Saronno","Castellanza","Tradate","Luino","Laveno-Mombello"],"VB":["Verbania","Domodossola","Omegna","Stresa","Baveno"],"VC":["Vercelli","Borgosesia","Gattinara","Santhia"],"VE":["Venezia","Chioggia","Mestre","Jesolo","San Dona di Piave","Mira","Spinea","Noale","Martellago","Marcon","Mirano","Dolo","Caorle"],"VI":["Vicenza","Bassano del Grappa","Schio","Valdagno","Thiene","Arzignano","Montecchio Maggiore","Marostica"],"VR":["Verona","Villafranca di Verona","Legnago","San Bonifacio","Negrar","Bussolengo","San Giovanni Lupatoto","Cerea","Pescantina","Sona"],"VT":["Viterbo","Civita Castellana","Tarquinia","Montefiascone","Vetralla","Orte"],"VV":["Vibo Valentia","Tropea","Pizzo","Serra San Bruno"]};
const WORLD_CITIES = {"Albania":["Tirana","Durazzo","Valona","Scutari","Elbasan"],"Algeria":["Algeri","Orano","Costantina","Annaba"],"Andorra":["Andorra la Vella"],"Argentina":["Buenos Aires","Cordoba","Rosario","Mendoza","Mar del Plata"],"Australia":["Sydney","Melbourne","Brisbane","Perth","Adelaide","Canberra"],"Austria":["Vienna","Graz","Linz","Salisburgo","Innsbruck"],"Belgio":["Bruxelles","Anversa","Gand","Bruges","Liegi"],"Bosnia":["Sarajevo","Banja Luka","Mostar","Tuzla"],"Brasile":["San Paolo","Rio de Janeiro","Brasilia","Salvador","Belo Horizonte","Fortaleza"],"Bulgaria":["Sofia","Plovdiv","Varna","Burgas"],"Canada":["Toronto","Montreal","Vancouver","Ottawa","Calgary","Edmonton"],"Cile":["Santiago","Valparaiso","Concepcion","Vina del Mar"],"Cina":["Pechino","Shanghai","Guangzhou","Shenzhen","Chengdu","Hangzhou"],"Cipro":["Nicosia","Limassol","Larnaca","Paphos"],"Colombia":["Bogota","Medellin","Cali","Barranquilla","Cartagena"],"Corea del Sud":["Seul","Busan","Incheon","Daegu"],"Croazia":["Zagabria","Spalato","Rijeka","Dubrovnik","Pola","Zara"],"Cuba":["L'Avana","Santiago de Cuba","Trinidad"],"Danimarca":["Copenaghen","Aarhus","Odense","Aalborg"],"Ecuador":["Quito","Guayaquil","Cuenca"],"Egitto":["Il Cairo","Alessandria","Luxor","Sharm el-Sheikh","Hurghada"],"Emirati Arabi":["Dubai","Abu Dhabi","Sharjah"],"Estonia":["Tallinn","Tartu"],"Filippine":["Manila","Cebu","Davao"],"Finlandia":["Helsinki","Espoo","Tampere","Turku"],"Francia":["Parigi","Marsiglia","Lione","Tolosa","Nizza","Bordeaux","Strasburgo","Lilla","Nantes","Montpellier"],"Georgia":["Tbilisi","Batumi","Kutaisi"],"Germania":["Berlino","Monaco","Amburgo","Francoforte","Colonia","Stoccarda","Dusseldorf","Dresda","Lipsia","Dortmund","Norimberga","Hannover","Brema"],"Ghana":["Accra","Kumasi","Tamale"],"Giamaica":["Kingston","Montego Bay"],"Giappone":["Tokyo","Osaka","Kyoto","Yokohama","Nagoya","Sapporo","Kobe","Fukuoka"],"Grecia":["Atene","Salonicco","Patrasso","Heraklion","Rodi","Corfù"],"India":["Nuova Delhi","Mumbai","Bangalore","Chennai","Kolkata","Hyderabad","Pune","Jaipur","Goa"],"Indonesia":["Giacarta","Bali","Surabaya","Bandung","Yogyakarta"],"Irlanda":["Dublino","Cork","Galway","Limerick"],"Islanda":["Reykjavik","Akureyri"],"Israele":["Gerusalemme","Tel Aviv","Haifa","Eilat"],"Lettonia":["Riga","Daugavpils"],"Lituania":["Vilnius","Kaunas"],"Lussemburgo":["Lussemburgo"],"Malesia":["Kuala Lumpur","Penang","Malacca","Langkawi"],"Malta":["La Valletta","Sliema","St. Julian's","Mdina"],"Marocco":["Casablanca","Marrakech","Rabat","Fez","Tangeri","Agadir"],"Messico":["Citta del Messico","Cancun","Guadalajara","Monterrey","Playa del Carmen","Tulum"],"Monaco":["Monaco","Monte Carlo"],"Montenegro":["Podgorica","Budva","Kotor","Tivat"],"Norvegia":["Oslo","Bergen","Trondheim","Stavanger","Tromso"],"Nuova Zelanda":["Auckland","Wellington","Christchurch","Queenstown"],"Paesi Bassi":["Amsterdam","Rotterdam","L'Aia","Utrecht","Eindhoven","Maastricht"],"Peru":["Lima","Cusco","Arequipa","Machu Picchu"],"Polonia":["Varsavia","Cracovia","Danzica","Breslavia","Poznan","Lodz"],"Portogallo":["Lisbona","Porto","Faro","Braga","Coimbra","Funchal"],"Qatar":["Doha"],"Regno Unito":["Londra","Manchester","Birmingham","Liverpool","Edimburgo","Glasgow","Bristol","Leeds","Cardiff","Belfast","Oxford","Cambridge","Brighton","Bath"],"Rep. Ceca":["Praga","Brno","Ostrava","Pilsen"],"Romania":["Bucarest","Cluj-Napoca","Timisoara","Iasi","Brasov","Sibiu","Costanza"],"Russia":["Mosca","San Pietroburgo","Novosibirsk","Kazan"],"Serbia":["Belgrado","Novi Sad","Nis"],"Slovacchia":["Bratislava","Kosice"],"Slovenia":["Lubiana","Maribor","Celje","Pirano","Capodistria"],"Spagna":["Madrid","Barcellona","Valencia","Siviglia","Malaga","Bilbao","Saragozza","Palma di Maiorca","Ibiza","Granada","San Sebastian","Alicante","Marbella","Tenerife"],"Stati Uniti":["New York","Los Angeles","Chicago","Miami","San Francisco","Las Vegas","Washington","Boston","Seattle","Austin","Nashville","Denver","Portland","Atlanta","Philadelphia","Houston","Dallas","San Diego","Orlando","Honolulu"],"Sudafrica":["Citta del Capo","Johannesburg","Durban","Pretoria"],"Svezia":["Stoccolma","Goteborg","Malmo","Uppsala"],"Svizzera":["Zurigo","Ginevra","Berna","Basilea","Losanna","Lugano","Lucerna","Interlaken"],"Thailandia":["Bangkok","Chiang Mai","Phuket","Pattaya","Krabi","Koh Samui"],"Tunisia":["Tunisi","Hammamet","Sousse","Djerba","Monastir"],"Turchia":["Istanbul","Ankara","Smirne","Antalya","Bodrum","Cappadocia"],"Ucraina":["Kiev","Leopoli","Odessa","Kharkiv"],"Ungheria":["Budapest","Debrecen","Szeged"],"Uruguay":["Montevideo","Punta del Este"],"Venezuela":["Caracas","Maracaibo","Valencia"]};
const IT_COORDS = {"AG":[37.31,13.58],"AL":[44.91,8.61],"AN":[43.62,13.52],"AO":[45.74,7.32],"AP":[42.85,13.57],"AQ":[42.35,13.4],"AR":[43.46,11.88],"AT":[44.9,8.21],"AV":[40.91,14.79],"BA":[41.12,16.87],"BG":[45.7,9.67],"BI":[45.56,8.05],"BL":[46.14,12.22],"BN":[41.13,14.78],"BO":[44.49,11.34],"BR":[40.63,17.94],"BS":[45.54,10.21],"BT":[41.32,16.28],"BZ":[46.5,11.35],"CA":[39.22,9.12],"CB":[41.56,14.66],"CE":[41.07,14.33],"CH":[42.35,14.17],"CL":[37.49,14.06],"CN":[44.38,7.55],"CO":[45.81,9.08],"CR":[45.13,10.02],"CS":[39.3,16.25],"CT":[37.5,15.09],"CZ":[38.91,16.59],"EN":[37.57,14.28],"FE":[44.84,11.62],"FG":[41.46,15.55],"FI":[43.77,11.25],"FM":[43.16,13.72],"FR":[41.64,13.35],"GE":[44.41,8.93],"GO":[45.94,13.62],"GR":[42.76,11.11],"IM":[43.89,8.04],"IS":[41.59,14.23],"KR":[39.08,17.13],"LC":[45.85,9.39],"LE":[40.35,18.17],"LI":[43.55,10.31],"LO":[45.31,9.5],"LT":[41.47,12.9],"LU":[43.84,10.51],"MB":[45.58,9.27],"MC":[43.3,13.45],"ME":[38.19,15.55],"MI":[45.46,9.19],"MN":[45.16,10.79],"MO":[44.65,10.92],"MS":[44.04,10.14],"MT":[40.67,16.6],"NA":[40.85,14.27],"NO":[45.45,8.62],"NU":[40.32,9.33],"OR":[39.91,8.59],"PA":[38.12,13.36],"PC":[45.05,9.69],"PD":[45.41,11.88],"PE":[42.46,14.21],"PG":[43.11,12.39],"PI":[43.72,10.4],"PN":[45.96,12.66],"PO":[43.88,11.1],"PR":[44.8,10.33],"PT":[43.93,10.92],"PU":[43.91,12.91],"PV":[45.18,9.16],"PZ":[40.64,15.81],"RA":[44.42,12.2],"RC":[38.11,15.65],"RE":[44.7,10.63],"RG":[36.93,14.73],"RI":[42.4,12.86],"RM":[41.89,12.49],"RN":[44.06,12.57],"RO":[45.07,11.79],"SA":[40.68,14.77],"SI":[43.32,11.33],"SO":[46.17,9.87],"SP":[44.11,9.82],"SR":[37.07,15.29],"SS":[40.73,8.56],"SU":[39.17,8.52],"SV":[44.31,8.48],"TA":[40.48,17.23],"TE":[42.66,13.7],"TN":[46.07,11.12],"TO":[45.07,7.69],"TP":[38.02,12.51],"TR":[42.56,12.64],"TS":[45.65,13.78],"TV":[45.67,12.24],"UD":[46.06,13.24],"VA":[45.82,8.83],"VB":[45.92,8.55],"VC":[45.32,8.42],"VE":[45.44,12.34],"VI":[45.55,11.55],"VR":[45.44,10.99],"VT":[42.42,12.11],"VV":[38.68,16.1]};
const WORLD_COORDS = {"Albania":[41.33,19.82],"Algeria":[36.75,3.04],"Andorra":[42.51,1.52],"Argentina":[-34.6,-58.38],"Australia":[-33.87,151.21],"Austria":[48.21,16.37],"Belgio":[50.85,4.35],"Bosnia":[43.86,18.41],"Brasile":[-23.55,-46.63],"Bulgaria":[42.7,23.32],"Canada":[43.65,-79.38],"Cile":[-33.45,-70.67],"Cina":[39.9,116.4],"Cipro":[35.17,33.37],"Colombia":[4.71,-74.07],"Corea del Sud":[37.57,126.98],"Croazia":[45.81,15.98],"Cuba":[23.11,-82.37],"Danimarca":[55.68,12.57],"Ecuador":[-0.18,-78.47],"Egitto":[30.04,31.24],"Emirati Arabi":[25.2,55.27],"Estonia":[59.44,24.75],"Filippine":[14.6,120.98],"Finlandia":[60.17,24.94],"Francia":[48.86,2.35],"Georgia":[41.72,44.79],"Germania":[52.52,13.41],"Ghana":[5.56,-0.2],"Giamaica":[18.0,-76.79],"Giappone":[35.68,139.69],"Grecia":[37.98,23.73],"India":[28.61,77.21],"Indonesia":[-6.21,106.85],"Irlanda":[53.35,-6.26],"Islanda":[64.15,-21.94],"Israele":[32.07,34.78],"Lettonia":[56.95,24.11],"Lituania":[54.69,25.28],"Lussemburgo":[49.61,6.13],"Malesia":[3.14,101.69],"Malta":[35.9,14.51],"Marocco":[33.97,-6.85],"Messico":[19.43,-99.13],"Monaco":[43.74,7.42],"Montenegro":[42.44,19.26],"Norvegia":[59.91,10.75],"Nuova Zelanda":[-36.85,174.76],"Paesi Bassi":[52.37,4.9],"Peru":[-12.05,-77.04],"Polonia":[52.23,21.01],"Portogallo":[38.72,-9.14],"Qatar":[25.29,51.53],"Regno Unito":[51.51,-0.13],"Rep. Ceca":[50.08,14.44],"Romania":[44.43,26.1],"Russia":[55.76,37.62],"Serbia":[44.79,20.47],"Slovacchia":[48.15,17.11],"Slovenia":[46.06,14.51],"Spagna":[40.42,-3.7],"Stati Uniti":[40.71,-74.01],"Sudafrica":[-33.93,18.42],"Svezia":[59.33,18.07],"Svizzera":[47.38,8.54],"Thailandia":[13.76,100.5],"Tunisia":[36.81,10.18],"Turchia":[41.01,28.98],"Ucraina":[50.45,30.52],"Ungheria":[47.5,19.04],"Uruguay":[-34.91,-56.16],"Venezuela":[10.49,-66.88]};
const PE = { lat: 42.4618, lng: 14.2161 };
const IVA = 0.22;

const T = {
  it: { subtitle:"Calcola il tuo preventivo", format:"FORMAT", eventDetails:"DETTAGLI EVENTO", eventName:"NOME EVENTO / VENUE", eventPhoto:"FOTO EVENTO *", uploadText:"Carica foto evento o location", country:"STATO", province:"PROVINCIA", city:"CITTA'", eventDate:"DATA EVENTO", service:"SERVICE AUDIO / LUCI", serviceBand:"SERVICE BAND", serviceBandDesc:"Piccolo service incluso", serviceOwn:"SERVICE PROPRIO", serviceOwnDesc:"Organizzatore fornisce service", serviceNote:"Service band solo entro 150 km.", yourData:"I TUOI DATI", firstName:"NOME", lastName:"COGNOME", organization:"ORGANIZZAZIONE", phone:"TELEFONO", extras:"ALTRI SERVIZI", videoName:"Video Dedicato", videoDesc:"Video promo personalizzato", djName:"DJ Set Prima e Dopo", djDesc:"Selezione reggae pre/post live", origName:"Brani Inediti", origDesc:"Originali Kinky People in scaletta", weddingName:"Wedding", weddingDesc:"Live show per matrimoni", weddingLink:"Info WhatsApp →", generate:"GENERA PREVENTIVO PDF", generating:"GENERAZIONE...", generated:"✓ GENERATO!", incomplete:"COMPILA I CAMPI RICHIESTI", printLabel:"Versione stampabile (sfondo bianco)", waText:"Vuoi info?", waHi:"Contattaci su WhatsApp", select:"Seleziona...", search:"Cerca...", typeCity:"Scrivi citta...", free:"GRATIS", local:"LOCALE", medium:"MEDIA", far:"LUNGA", island:"ISOLA", abroad:"ESTERO", localMsg:"Nessun costo aggiuntivo. Service band disponibile.", mediumMsg:"Trasferta + furgone + autostrada + vitto/alloggio.", farMsg:"Trasferta maggiorata + furgone + autostrada + vitto/alloggio.", islandMsg:"Voli A/R + navetta aeroporto + vitto/alloggio (a carico org.).", abroadMsg:"Voli A/R + navetta aeroporto + vitto/alloggio (a carico org.)." },
  en: { subtitle:"Get your quote", format:"FORMAT", eventDetails:"EVENT DETAILS", eventName:"EVENT NAME / VENUE", eventPhoto:"EVENT PHOTO *", uploadText:"Upload event or venue photo", country:"COUNTRY", province:"PROVINCE", city:"CITY", eventDate:"EVENT DATE", service:"SOUND / LIGHTING", serviceBand:"BAND PA", serviceBandDesc:"Small PA included", serviceOwn:"OWN SERVICE", serviceOwnDesc:"Organizer provides PA", serviceNote:"Band PA only within 150 km.", yourData:"YOUR DETAILS", firstName:"FIRST NAME", lastName:"LAST NAME", organization:"ORGANIZATION", phone:"PHONE", extras:"EXTRAS", videoName:"Dedicated Video", videoDesc:"Custom promo video", djName:"DJ Set Before & After", djDesc:"Reggae selection pre/post show", origName:"Original Songs", origDesc:"Kinky People originals in setlist", weddingName:"Wedding", weddingDesc:"Live show for weddings", weddingLink:"Info WhatsApp →", generate:"GENERATE PDF QUOTE", generating:"GENERATING...", generated:"✓ GENERATED!", incomplete:"FILL REQUIRED FIELDS", printLabel:"Printable version (white background)", waText:"Need info?", waHi:"Contact us on WhatsApp", select:"Select...", search:"Search...", typeCity:"Type city...", free:"FREE", local:"LOCAL", medium:"MEDIUM", far:"FAR", island:"ISLAND", abroad:"ABROAD", localMsg:"No extra costs. Band PA available.", mediumMsg:"Travel + van + tolls + board & lodging.", farMsg:"Extended travel + van + tolls + board & lodging.", islandMsg:"Flights R/T + airport shuttle + board & lodging (org. charge).", abroadMsg:"Flights R/T + airport shuttle + board & lodging (org. charge)." }
};

function hav(a,b,c,d) { const R=6371,x=Math.PI/180,dL=(c-a)*x,dG=(d-b)*x,s=Math.sin(dL/2)**2+Math.cos(a*x)*Math.cos(c*x)*Math.sin(dG/2)**2; return R*2*Math.atan2(Math.sqrt(s),Math.sqrt(1-s)); }
function fE(n) { return n.toLocaleString("it-IT",{minimumFractionDigits:2})+" EUR"; }

/* ═══════════════════════════════════════════
   STATIC DROPDOWN - for countries & provinces
   No external state dependency, all internal
   ═══════════════════════════════════════════ */
function StaticDropdown({ items, value, onChange, placeholder, disabled }) {
  const [open, setOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState(items);
  const ref = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h); document.addEventListener("touchstart", h);
    return () => { document.removeEventListener("mousedown", h); document.removeEventListener("touchstart", h); };
  }, []);

  const doOpen = () => {
    if (disabled) return;
    const next = !open;
    setOpen(next);
    if (next) { setFilteredItems(items); setTimeout(() => { if (inputRef.current) { inputRef.current.value = ""; inputRef.current.focus(); } }, 80); }
  };

  const handleSearch = () => {
    const val = inputRef.current?.value || "";
    const ql = val.toLowerCase();
    setFilteredItems(items.filter(i => { const l = typeof i === "string" ? i : i.label; return l.toLowerCase().includes(ql); }));
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div onClick={doOpen} style={{ width:"100%",padding:"11px 32px 11px 12px",background:"#222",border:"1px solid "+(open?"#D4A843":"#333"),borderRadius:6,color:value?"#F5F5F5":"#555",fontSize:16,cursor:disabled?"not-allowed":"pointer",opacity:disabled?.3:1,position:"relative",fontFamily:"inherit" }}>
        {value || placeholder || "Select..."}<span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"#D4A843",fontSize:12}}>▾</span>
      </div>
      {open && <div style={{position:"absolute",top:"calc(100% + 2px)",left:0,right:0,background:"#1A1A1A",border:"1px solid #9A7A30",borderRadius:6,maxHeight:220,overflowY:"auto",zIndex:100,boxShadow:"0 8px 24px rgba(0,0,0,.5)"}}>
        <input ref={inputRef} defaultValue="" onInput={handleSearch} placeholder="Cerca..." style={{width:"100%",padding:"10px 12px",background:"#222",border:"none",borderBottom:"1px solid #333",color:"#F5F5F5",fontSize:16,outline:"none",fontFamily:"inherit",borderRadius:"6px 6px 0 0"}} />
        {filteredItems.map((item,i) => {
          const label = typeof item === "string" ? item : item.label;
          return <div key={i} onClick={() => { onChange(item); setOpen(false); }} style={{padding:"11px 12px",color:"#CCC",fontSize:15,cursor:"pointer"}} onMouseEnter={e=>{e.currentTarget.style.background="rgba(212,168,67,.1)";e.currentTarget.style.color="#D4A843"}} onMouseLeave={e=>{e.currentTarget.style.background="";e.currentTarget.style.color="#CCC"}}>{label}</div>;
        })}
        {filteredItems.length === 0 && <div style={{padding:"10px 12px",color:"#888",fontSize:13,fontStyle:"italic"}}>Nessun risultato</div>}
      </div>}
    </div>
  );
}

/* ═══════════════════════════════════════════
   CITY DROPDOWN - with async search
   Manages its own fetch, no parent re-render
   ═══════════════════════════════════════════ */
function CityDropdown({ value, onSelect, disabled, stato, provCode, isIT }) {
  const [open, setOpen] = useState(false);
  const [filteredCities, setFilteredCities] = useState([]);
  const ref = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h); document.addEventListener("touchstart", h);
    return () => { document.removeEventListener("mousedown", h); document.removeEventListener("touchstart", h); };
  }, []);

  const getAllCities = () => isIT ? (IT_CITIES[provCode] || []) : (WORLD_CITIES[stato] || []);

  const doOpen = () => {
    if (disabled) return;
    const all = getAllCities();
    setFilteredCities(all);
    setOpen(true);
    setTimeout(() => { if (inputRef.current) { inputRef.current.value = ""; inputRef.current.focus(); } }, 80);
  };

  const handleSearch = () => {
    const val = inputRef.current?.value || "";
    const all = getAllCities();
    if (val.length === 0) { setFilteredCities(all); return; }
    setFilteredCities(all.filter(c => c.toLowerCase().includes(val.toLowerCase())));
  };

  const handleKey = (e) => { if (e.key === "Enter" && filteredCities.length > 0) pick(filteredCities[0]); };

  const pick = (cityName) => {
    let lat, lng;
    if (isIT) { const co = IT_COORDS[provCode]; if (co) { lat = co[0]; lng = co[1]; } }
    else { const co = WORLD_COORDS[stato]; if (co) { lat = co[0]; lng = co[1]; } }
    onSelect({ name: cityName, lat: lat || 42.46, lon: lng || 14.21 });
    setOpen(false);
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div onClick={doOpen} style={{ width:"100%",padding:"11px 32px 11px 12px",background:"#222",border:"1px solid "+(open?"#D4A843":"#333"),borderRadius:6,color:value?"#F5F5F5":"#555",fontSize:16,cursor:disabled?"not-allowed":"pointer",opacity:disabled?.3:1,position:"relative",fontFamily:"inherit" }}>
        {value || "Scrivi citta..."}<span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"#D4A843",fontSize:12}}>&#9662;</span>
      </div>
      {open && <div style={{position:"absolute",top:"calc(100% + 2px)",left:0,right:0,background:"#1A1A1A",border:"1px solid #9A7A30",borderRadius:6,maxHeight:260,overflowY:"auto",zIndex:100,boxShadow:"0 8px 24px rgba(0,0,0,.5)"}}>
        <input ref={inputRef} defaultValue="" onInput={handleSearch} onKeyDown={handleKey} placeholder="Scrivi nome citta..." style={{width:"100%",padding:"10px 12px",background:"#222",border:"none",borderBottom:"1px solid #333",color:"#F5F5F5",fontSize:16,outline:"none",fontFamily:"inherit",borderRadius:"6px 6px 0 0"}} />
        {filteredCities.length === 0 && <div style={{padding:"10px 12px",color:"#888",fontSize:13,fontStyle:"italic"}}>{getAllCities().length === 0 ? "Nessuna citta disponibile per questo stato" : "Nessun risultato"}</div>}
        {filteredCities.map((city,i) => (
          <div key={i} onClick={() => pick(city)} style={{padding:"11px 12px",cursor:"pointer",color:"#CCC",fontSize:15}} onMouseEnter={e=>{e.currentTarget.style.background="rgba(212,168,67,.1)";e.currentTarget.style.color="#D4A843"}} onMouseLeave={e=>{e.currentTarget.style.background="";e.currentTarget.style.color="#CCC"}}>
            {city}
          </div>
        ))}
      </div>}
    </div>
  );
}

/* ═══════════════════════════════════════════
   STABLE SUB-COMPONENTS (outside App to prevent re-creation)
   ═══════════════════════════════════════════ */
const gold = "#D4A843", dk = "#111", di = "#222", bd = "#333";
const inpStyle = {width:"100%",padding:"11px 12px",background:di,border:"1px solid "+bd,borderRadius:6,color:"#F5F5F5",fontSize:16,fontFamily:"inherit",outline:"none"};

function Label({children}) { return <div style={{fontSize:11,fontWeight:600,letterSpacing:1.5,textTransform:"uppercase",color:gold,marginBottom:4}}>{children}</div>; }
function Section({children}) { return <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"1.15rem",letterSpacing:2,color:gold,marginBottom:12,paddingBottom:4,borderBottom:"1px solid #2A2A2A"}}>{children}</h2>; }
function Chk({on,toggle,nm,ds,pr,prSt}) {
  return (
    <div onClick={toggle} style={{display:"flex",alignItems:"center",gap:10,padding:"11px 12px",background:on?"rgba(212,168,67,.05)":di,border:"1px solid "+(on?gold:bd),borderRadius:8,marginBottom:8,cursor:"pointer"}}>
      <div style={{width:17,height:17,border:"2px solid "+(on?gold:bd),borderRadius:3,background:on?gold:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{on&&<span style={{color:dk,fontSize:11,fontWeight:700}}>✓</span>}</div>
      <div style={{flex:1}}><div style={{fontWeight:600,fontSize:13,color:on?gold:"#F5F5F5"}}>{nm}</div><div style={{fontSize:11,color:"#888",marginTop:1}}>{ds}</div></div>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"1rem",color:gold,whiteSpace:"nowrap",...(prSt||{})}}>{pr}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════ */
export default function App() {
  const [lang, setLang] = useState("it");
  const t = T[lang];
  const [fmt, setFmt] = useState("jamrock");
  const [venue, setVenue] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPrev, setPhotoPrev] = useState(null);
  const [stato, setStato] = useState("Italia");
  const [provCode, setProvCode] = useState("");
  const [provLabel, setProvLabel] = useState("");
  const [citta, setCitta] = useState("");
  const [dist, setDist] = useState(0);
  const [locType, setLocType] = useState("mainland");
  const [evDate, setEvDate] = useState("");
  const [svc, setSvc] = useState("band");
  const [nome, setNome] = useState(""); const [cogn, setCogn] = useState("");
  const [org, setOrg] = useState(""); const [email, setEmail] = useState(""); const [tel, setTel] = useState("");
  const [vid, setVid] = useState(false); const [dj, setDj] = useState(false); const [ined, setIned] = useState(false);
  const [printMode, setPrintMode] = useState(false);
  const [btn, setBtn] = useState("idle"); // idle|loading|done|error
  const [pdfOk, setPdfOk] = useState(false);
  const jspdfRef = useRef(null);
  const fileRef = useRef(null);

  const isIT = stato.toLowerCase() === "italia";
  const getLT = (pc) => { if (!isIT) return "international"; if (SIC.includes(pc)||SAR.includes(pc)) return "island"; return "mainland"; };
  const needTravel = dist > 150 || locType === "island" || locType === "international";
  const needFlights = locType === "island" || locType === "international";

  useEffect(() => { if (needTravel) setSvc("proprio"); }, [needTravel]);

  // Load jsPDF via script tag (UMD module, not ES - import() won't work)
  useEffect(() => {
    if (window.jspdf) { jspdfRef.current = window.jspdf; setPdfOk(true); return; }
    var tryLoad = function(url, cb) {
      var s = document.createElement("script");
      s.src = url;
      s.onload = function() { if (window.jspdf) { jspdfRef.current = window.jspdf; setPdfOk(true); } else { cb && cb(); } };
      s.onerror = function() { cb && cb(); };
      document.head.appendChild(s);
    };
    // Try primary CDN, then fallback
    tryLoad("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js", function() {
      tryLoad("https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js", null);
    });
  }, []);

  const handlePhoto = (e) => { const f=e.target.files?.[0]; if(f){setPhoto(f);const r=new FileReader();r.onload=ev=>setPhotoPrev(ev.target.result);r.readAsDataURL(f);} };
  const handleCountry = (val) => { setStato(val); setProvCode(""); setProvLabel(""); setCitta(""); setDist(0); setLocType(val.toLowerCase()==="italia"?"mainland":"international"); };
  const handleProv = (item) => { setProvCode(item.code); setProvLabel(item.label); setCitta(""); setDist(0); setLocType(getLT(item.code)); };
  const handleCity = (item) => { setCitta(item.name); const d=Math.round(hav(PE.lat,PE.lng,item.lat,item.lon)*1.35); setDist(d); setLocType(getLT(provCode)); };

  // Distance display
  const distBox = () => {
    if (dist === 0) return null;
    let tag, msg;
    if (locType==="island") { tag=t.island+" - ~"+dist+" KM"; msg=t.islandMsg; }
    else if (locType==="international") { tag=t.abroad+" - ~"+dist+" KM"; msg=t.abroadMsg; }
    else if (dist<=150) { tag=t.local+" - ~"+dist+" KM"; msg=t.localMsg; }
    else if (dist<=500) { tag=t.medium+" - ~"+dist+" KM"; msg=t.mediumMsg; }
    else { tag=t.far+" - ~"+dist+" KM"; msg=t.farMsg; }
    return <div style={{background:"#1A1A1A",border:"1px solid #333",borderRadius:8,padding:"10px 12px",marginBottom:12,fontSize:13,color:"#CCC"}}>
      <span style={{display:"inline-block",background:"rgba(212,168,67,.12)",color:"#D4A843",fontSize:11,fontWeight:600,padding:"2px 6px",borderRadius:3,marginBottom:4,letterSpacing:1}}>{tag}</span><br/>{msg}
    </div>;
  };

  // Validate
  const isValid = citta && dist > 0;

  // PDF
  const makePDF = () => {
    if (!isValid) { setBtn("error"); setTimeout(()=>setBtn("idle"),2000); return; }
    if (!pdfOk || !jspdfRef.current) { alert("PDF loading..."); return; }
    setBtn("loading");
    setTimeout(() => {
      try {
        const {jsPDF}=jspdfRef.current; const doc=new jsPDF({unit:"mm",format:"a4"}); const W=210,H=297;
        const pm=printMode;
        const C=pm?{bg:[255,255,255],cd:[245,245,245],gd:[160,120,30],tx:[60,60,60],wh:[30,30,30],su:[120,120,120],rA:[248,248,248],rB:[238,238,238],tB:[180,140,30],tT:[255,255,255]}:{bg:[17,17,17],cd:[42,42,42],gd:[212,168,67],tx:[204,204,204],wh:[245,245,245],su:[136,136,136],rA:[28,28,28],rB:[36,36,36],tB:[212,168,67],tT:[17,17,17]};
        const sc=k=>doc.setFillColor(...C[k]),tc=k=>doc.setTextColor(...C[k]);
        let sp=1000;if(locType==="island")sp=1500;else if(locType==="international")sp=2000;else if(dist>500)sp=1400;else if(dist>150)sp=1200;
        const fd=needFlights?0:dist>300?2:dist>150?1:0;
        let tras=0,fur=fd*150,aut=needTravel?100:0,pull=needFlights?200:0;
        if(!needFlights&&needTravel)tras=dist>500?400:200;
        const vC=vid?100:0,dC=dj?250:0;
        const imp=sp+tras+fur+aut+pull+vC+dC,iva=Math.round(imp*IVA*100)/100,tot=imp+iva;
        const fl=fmt==="jamrock"?"Jamrock Live Show":"Bob Marley Tribute";
        sc("bg");doc.rect(0,0,W,H,"F");sc("gd");doc.rect(0,0,W,4,"F");
        try{doc.addImage(LOGO,"PNG",W-42,7,18,18);}catch(e){}
        doc.setFont("helvetica","bold");doc.setFontSize(22);tc("gd");doc.text("KINKY PEOPLE",25,19);
        doc.setFont("helvetica","normal");doc.setFontSize(8.5);tc("tx");doc.text("Bob Marley Tribute / Jamrock Live Show",25,26);
        sc("gd");doc.rect(25,29,38,.3,"F");
        doc.setFont("helvetica","bold");doc.setFontSize(15);tc("wh");doc.text("PREVENTIVO",25,40);
        doc.setFont("helvetica","normal");doc.setFontSize(7.5);tc("su");doc.text("Data: "+new Date().toLocaleDateString("it-IT"),25,46);
        if(nome||cogn||org)doc.text((nome+" "+cogn).trim()+(org?" - "+org:""),W-25,46,{align:"right"});
        const bY=51,bH=38;sc("cd");doc.roundedRect(25,bY,W-50,bH,2,2,"F");sc("gd");doc.rect(25,bY,1,bH,"F");
        const ds2=evDate?new Date(evDate).toLocaleDateString("it-IT"):"TBD",ls=citta+(provCode?" ("+provCode+")":"");
        [["EVENTO",venue?venue+" - Kinky People - "+fl:"Kinky People - "+fl],["DATA",ds2],["LOCATION",ls],["DURATA","1x90min / 2x45min"],["BAND","Live - 7 elementi"]].forEach(([k,v],i)=>{const dy=bY+7+i*6.2;doc.setFont("helvetica","bold");doc.setFontSize(6.5);tc("gd");doc.text(k,32,dy);doc.setFont("helvetica","normal");doc.setFontSize(8.5);tc("wh");doc.text(v,58,dy);});
        const items=[];items.push([svc==="band"?"Spettacolo "+fl+" (service incl.)":"Spettacolo "+fl,fE(sp)]);
        if(tras>0)items.push(["Trasferta (PE-"+citta+" ~"+dist+"km)",fE(tras)]);
        if(pull>0)items.push(["Transfer pullman",fE(pull)]);
        if(fur>0)items.push(["Furgone ("+fd+"gg x 150EUR)",fE(fur)]);
        if(aut>0)items.push(["Autostrada/pedaggi",fE(aut)]);
        if(vC>0)items.push(["Video dedicato",fE(vC)]);
        if(dC>0)items.push(["DJ Set pre/post",fE(dC)]);
        let py=bY+bH+8;doc.setFont("helvetica","bold");doc.setFontSize(11);tc("gd");doc.text("DETTAGLIO COSTI",25,py);sc("gd");doc.rect(25,py+1,32,.3,"F");py+=7;
        const rH=8;items.forEach(([d2,p],i)=>{sc(i%2===0?"rA":"rB");doc.rect(25,py,160,rH,"F");doc.setFont("helvetica","normal");doc.setFontSize(8);tc("tx");doc.text(d2,28,py+5.2);doc.setFont("helvetica","bold");doc.setFontSize(8.5);tc("wh");doc.text(p,182,py+5.2,{align:"right"});py+=rH;});
        py+=1;sc("rA");doc.rect(25,py,160,rH,"F");doc.setFont("helvetica","normal");doc.setFontSize(7.5);tc("su");doc.text("Imponibile",28,py+5.2);doc.setFont("helvetica","bold");doc.setFontSize(8);tc("wh");doc.text(fE(imp),182,py+5.2,{align:"right"});py+=rH;
        sc("rB");doc.rect(25,py,160,rH,"F");doc.setFont("helvetica","normal");doc.setFontSize(7.5);tc("su");doc.text("IVA 22%",28,py+5.2);doc.setFont("helvetica","bold");doc.setFontSize(8);tc("wh");doc.text(fE(iva),182,py+5.2,{align:"right"});py+=rH;
        py+=1;sc("tB");doc.roundedRect(25,py,160,9,1.5,1.5,"F");doc.setFont("helvetica","bold");doc.setFontSize(9);tc("tT");doc.text("TOTALE (IVA INCL.)",28,py+6);doc.setFontSize(11);doc.text(fE(tot),182,py+6,{align:"right"});
        py+=16;doc.setFont("helvetica","bold");doc.setFontSize(9);tc("gd");doc.text("A CARICO DELL'ORGANIZZATORE",25,py);sc("gd");doc.rect(25,py+1,46,.2,"F");py+=7;
        doc.setFont("helvetica","normal");doc.setFontSize(7.5);tc("tx");
        if(needTravel){doc.text("- Vitto e alloggio per 7 persone (3 doppie + 1 singola)",28,py);py+=4.5;}
        if(svc==="proprio"){doc.text("- Service audio/luci adeguato alla venue",28,py);py+=4.5;}
        if(needFlights){doc.text("- Voli aerei A/R per 7 persone (bagaglio a mano)",28,py);py+=4.5;doc.text("- Servizio navetta aeroporto - alloggi (andata e ritorno)",28,py);py+=5;doc.setFontSize(7);tc("su");doc.text("Aeroporti raggiungibili: Pescara (PSR), Fiumicino (FCO), Ciampino (CIA)",28,py);py+=4;doc.text("I biglietti aerei saranno acquistati dall'organizzazione per conto dei 7",28,py);py+=4;doc.text("membri della band. Conferma ingaggio a seguito di firma contratto e",28,py);py+=4;doc.text("ricezione delle prenotazioni voli.",28,py);py+=5;doc.setFontSize(7.5);tc("tx");}
        if(needTravel){doc.setFontSize(6.5);tc("su");doc.text("* Costi vitto, alloggio, voli e navetta indicativi e da concordare.",28,py);py+=5;}
        py+=3;doc.setFont("helvetica","bold");doc.setFontSize(9);tc("gd");doc.text("NOTE",25,py);sc("gd");doc.rect(25,py+1,10,.2,"F");py+=7;doc.setFont("helvetica","normal");doc.setFontSize(7.5);tc("tx");doc.text("- Backline da concordare",28,py);py+=4.5;if(ined)doc.text("- Brani inediti Kinky People in scaletta",28,py);
        sc("gd");doc.rect(0,H-2.5,W,2.5,"F");doc.rect(25,H-16,W-50,.2,"F");
        doc.setFont("helvetica","bold");doc.setFontSize(6.5);tc("gd");doc.text("BOOKING",25,H-11);doc.setFont("helvetica","normal");doc.setFontSize(7);tc("tx");doc.text("Marco Torchetti - WhatsApp: +39 327 97 03 676",25,H-7.5);
        doc.setFont("helvetica","bold");doc.setFontSize(6.5);tc("gd");doc.text("SOCIAL",W-25,H-11,{align:"right"});doc.setFont("helvetica","normal");doc.setFontSize(7);tc("tx");doc.text("@kinkypeoplejamrock",W-25,H-7.5,{align:"right"});
        // === SAFE DOWNLOAD - works in iframe, desktop and mobile ===
        var pdfBlob = doc.output("blob");
        var fn = "Preventivo_KinkyPeople_"+citta.replace(/[^a-zA-Z0-9]/g,"_")+".pdf";
        
        // Create object URL
        var blobUrl = URL.createObjectURL(pdfBlob);
        
        // Create hidden link
        var link = document.createElement("a");
        link.href = blobUrl;
        link.download = fn;
        link.target = "_blank";
        link.rel = "noopener";
        
        // iOS Safari doesn't support download attribute well - detect and handle
        var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        
        if (isIOS) {
          // On iOS: open the PDF in a new tab where user can share/save
          // Using window.open is more reliable than link.click in iOS
          var newWin = window.open(blobUrl, "_blank");
          if (!newWin) {
            // Popup blocked - fallback to link click
            link.style.position = "fixed";
            link.style.top = "-10000px";
            document.body.appendChild(link);
            link.click();
            setTimeout(function(){ document.body.removeChild(link); URL.revokeObjectURL(blobUrl); }, 5000);
          } else {
            setTimeout(function(){ URL.revokeObjectURL(blobUrl); }, 60000);
          }
        } else {
          // Desktop & Android: use link.click()
          link.style.position = "fixed";
          link.style.top = "-10000px";
          document.body.appendChild(link);
          link.click();
          setTimeout(function(){ document.body.removeChild(link); URL.revokeObjectURL(blobUrl); }, 5000);
        }
        setBtn("done"); setTimeout(()=>setBtn("idle"),2500);
      } catch(e) { console.error(e); alert("Errore: "+e.message); setBtn("idle"); }
    }, 250);
  };

  // Styles
  const btnColors = { idle: "linear-gradient(135deg,#D4A843,#E8C96A)", loading: "linear-gradient(135deg,#9A7A30,#D4A843)", done: "#25D366", error: "#C0392B" };
  const btnText = { idle: t.generate, loading: t.generating, done: t.generated, error: t.incomplete };

  return (
    <div style={{background:dk,minHeight:"100vh",fontFamily:"'Inter',sans-serif",color:"#F5F5F5",overflowX:"hidden",touchAction:"pan-y"}}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
      <div style={{height:4,background:"linear-gradient(90deg,#9A7A30,#D4A843,#E8C96A,#D4A843)"}}/>
      <div style={{textAlign:"center",padding:"36px 20px 28px",position:"relative",borderBottom:"1px solid rgba(212,168,67,.2)"}}>
        <div onClick={()=>setLang(l=>l==="it"?"en":"it")} style={{position:"absolute",top:10,right:10,display:"flex",alignItems:"center",gap:4,cursor:"pointer",fontSize:12,color:"#888",padding:"4px 8px",border:"1px solid #333",borderRadius:14,background:"#1A1A1A"}}>
          {lang==="it" ? <svg width="16" height="11" viewBox="0 0 18 12"><rect width="6" height="12" fill="#009246"/><rect x="6" width="6" height="12" fill="#fff"/><rect x="12" width="6" height="12" fill="#CE2B37"/></svg> : <svg width="16" height="11" viewBox="0 0 18 12"><rect width="18" height="12" fill="#012169"/><path d="M0,0L18,12M18,0L0,12" stroke="#fff" strokeWidth="2"/><rect x="7.5" width="3" height="12" fill="#fff"/><rect y="4.5" width="18" height="3" fill="#fff"/><rect x="8" width="2" height="12" fill="#C8102E"/><rect y="5" width="18" height="2" fill="#C8102E"/></svg>}
          <span>{lang==="it"?"EN":"IT"}</span>
        </div>
        <img src={LOGO} alt="" style={{width:70,height:70,margin:"0 auto 10px",display:"block"}}/>
        <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"2.4rem",letterSpacing:5,color:gold}}>KINKY PEOPLE</h1>
        <p style={{fontSize:12,color:"#888",letterSpacing:3,textTransform:"uppercase",marginTop:6}}>Bob Marley Tribute / Jamrock Live Show</p>
        <p style={{fontSize:16,color:"#CCC",marginTop:16,fontWeight:300}}>{t.subtitle}</p>
      </div>

      <div style={{maxWidth:600,margin:"0 auto",padding:"24px 16px 50px"}}>
        <div style={{marginBottom:22}}><Section>{t.format}</Section>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {[["jamrock","JAMROCK","Reggae Party Band"],["tribute","BOB MARLEY TRIBUTE","Marley's Best of"]].map(([id,nm,ds])=>(
              <div key={id} onClick={()=>setFmt(id)} style={{padding:"12px 8px",border:"1px solid "+(fmt===id?gold:bd),borderRadius:8,background:fmt===id?"rgba(212,168,67,.06)":di,color:fmt===id?gold:"#CCC",textAlign:"center",cursor:"pointer"}}>
                <span style={{fontWeight:600,fontSize:14,display:"block"}}>{nm}</span>
                <span style={{fontSize:11,color:fmt===id?"#9A7A30":"#888",marginTop:2,display:"block"}}>{ds}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{marginBottom:22}}><Section>{t.eventDetails}</Section>
          <div style={{marginBottom:14}}><Label>{t.eventName}</Label><input placeholder="Es: Lido Tropical..." value={venue} onChange={e=>setVenue(e.target.value)} style={inpStyle}/></div>
          <div style={{marginBottom:14}}><Label>{t.eventPhoto}</Label>
            <div onClick={()=>fileRef.current?.click()} style={{border:"2px "+(photo?"solid "+gold:"dashed "+bd),borderRadius:8,padding:14,textAlign:"center",cursor:"pointer",background:di}}>
              <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} style={{display:"none"}}/>
              {photoPrev?<><img src={photoPrev} alt="" style={{maxHeight:90,borderRadius:4,display:"block",margin:"0 auto"}}/><div style={{fontSize:13,color:gold,marginTop:4}}>{photo?.name}</div></>:<><div style={{fontSize:"1.2rem"}}>📷</div><div style={{fontSize:12,color:"#888"}}>{t.uploadText}</div></>}
            </div>
          </div>
          <div style={{marginBottom:14}}><Label>{t.country}</Label><StaticDropdown items={COUNTRIES} value={stato} onChange={handleCountry} placeholder={t.select}/></div>
          {isIT && <div style={{marginBottom:14}}><Label>{t.province}</Label><StaticDropdown items={PROVS} value={provLabel} onChange={handleProv} placeholder={t.select}/></div>}
          <div style={{marginBottom:14}}><Label>{t.city}</Label><CityDropdown value={citta} onSelect={handleCity} disabled={isIT && !provCode} stato={stato} provCode={provCode} isIT={isIT}/></div>
          {distBox()}
          <div style={{marginBottom:14}}><Label>{t.eventDate}</Label><input type="date" value={evDate} onChange={e=>setEvDate(e.target.value)} style={{...inpStyle,colorScheme:"dark"}}/></div>
        </div>

        <div style={{marginBottom:22}}><Section>{t.service}</Section>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
            {[["band",t.serviceBand,t.serviceBandDesc],["proprio",t.serviceOwn,t.serviceOwnDesc]].map(([id,nm,ds])=>(
              <div key={id} onClick={()=>{if(id==="band"&&needTravel)return;setSvc(id);}} style={{padding:"12px 8px",border:"1px solid "+(svc===id?gold:bd),borderRadius:8,background:svc===id?"rgba(212,168,67,.06)":di,color:svc===id?gold:"#CCC",textAlign:"center",cursor:id==="band"&&needTravel?"not-allowed":"pointer",opacity:id==="band"&&needTravel?.2:1}}>
                <span style={{fontWeight:600,fontSize:14,display:"block"}}>{nm}</span>
                <span style={{fontSize:11,color:svc===id?"#9A7A30":"#888",marginTop:2,display:"block"}}>{ds}</span>
              </div>
            ))}
          </div>
          {needTravel && <p style={{fontSize:12,color:"#888",marginBottom:12}}><strong style={{color:gold}}>Nota:</strong> {t.serviceNote}</p>}
        </div>

        <div style={{marginBottom:22}}><Section>{t.yourData}</Section>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}><div><Label>{t.firstName}</Label><input value={nome} onChange={e=>setNome(e.target.value)} placeholder="Mario" style={inpStyle}/></div><div><Label>{t.lastName}</Label><input value={cogn} onChange={e=>setCogn(e.target.value)} placeholder="Rossi" style={inpStyle}/></div></div>
          <div style={{marginBottom:14}}><Label>{t.organization}</Label><input value={org} onChange={e=>setOrg(e.target.value)} placeholder="Associazione XYZ..." style={inpStyle}/></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}><div><Label>EMAIL</Label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="info@evento.it" style={inpStyle}/></div><div><Label>{t.phone}</Label><input type="tel" value={tel} onChange={e=>setTel(e.target.value)} placeholder="+39 333..." style={inpStyle}/></div></div>
        </div>

        <div style={{marginBottom:22}}><Section>{t.extras}</Section>
          <Chk on={vid} toggle={()=>setVid(v=>!v)} nm={t.videoName} ds={t.videoDesc} pr="+100€"/>
          <Chk on={dj} toggle={()=>setDj(v=>!v)} nm={t.djName} ds={t.djDesc} pr="+250€"/>
          <Chk on={ined} toggle={()=>setIned(v=>!v)} nm={t.origName} ds={t.origDesc} pr={t.free} prSt={{color:"#888",fontSize:12}}/>
          <div style={{display:"flex",alignItems:"center",gap:10,padding:"11px 12px",background:di,border:"1px solid "+bd,borderRadius:8}}>
            <div style={{width:17,height:17,borderRadius:3,background:"#2A2A2A",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:10}}>💍</div>
            <div style={{flex:1}}><div style={{fontWeight:600,fontSize:13,color:"#CCC"}}>{t.weddingName}</div><div style={{fontSize:11,color:"#888"}}>{t.weddingDesc}</div><a href="https://wa.me/393279703676?text=Info%20Wedding" target="_blank" rel="noopener noreferrer" style={{fontSize:11,color:gold,textDecoration:"none"}}>{t.weddingLink}</a></div>
          </div>
        </div>

        <button onClick={makePDF} style={{display:"block",width:"100%",padding:14,border:"none",borderRadius:8,background:btnColors[btn],color:btn==="error"?"#fff":"#111",fontFamily:"'Bebas Neue',sans-serif",fontSize:"1.15rem",letterSpacing:3,cursor:"pointer",transition:"all .2s",transform:btn==="loading"?"scale(.97)":"scale(1)",opacity:btn==="loading"?.7:1}}>
          {btnText[btn]}
        </button>
        {!pdfOk && <div style={{fontSize:11,color:"#9A7A30",textAlign:"center",marginTop:6}}>⏳ Caricamento motore PDF...</div>}
        <div onClick={()=>setPrintMode(p=>!p)} style={{display:"flex",alignItems:"center",gap:7,marginTop:10,cursor:"pointer"}}>
          <div style={{width:15,height:15,border:"2px solid "+(printMode?gold:bd),borderRadius:3,background:printMode?gold:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>{printMode&&<span style={{color:dk,fontSize:9,fontWeight:700}}>✓</span>}</div>
          <span style={{fontSize:12,color:"#888"}}>{t.printLabel}</span>
        </div>

        <a href="https://wa.me/393279703676?text=Ciao!" target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7,marginTop:24,padding:"14px 16px",borderRadius:10,background:"rgba(37,211,102,.07)",border:"1px solid rgba(37,211,102,.2)",textDecoration:"none"}}>
          <span style={{fontSize:14,color:"#F5F5F5",fontWeight:500}}>💬 {t.waText} <strong style={{color:"#25D366"}}>{t.waHi}</strong></span>
        </a>
        <div style={{display:"flex",justifyContent:"center",gap:12,marginTop:20,flexWrap:"wrap"}}>
          {[["https://www.booking.com","🏠 Booking"],["https://www.viamichelin.it","📍 ViaMichelin"],["https://www.airbnb.it","🏡 Airbnb"]].map(([u,l])=><a key={u} href={u} target="_blank" rel="noopener noreferrer" style={{color:"#888",textDecoration:"none",fontSize:11,padding:"5px 10px",border:"1px solid #333",borderRadius:5}}>{l}</a>)}
        </div>
      </div>

      <div style={{textAlign:"center",padding:"24px 16px",borderTop:"1px solid #2A2A2A"}}>
        <p style={{fontSize:11,color:"#888",lineHeight:1.6}}>KINKY PEOPLE — Live Reggae Band<br/>Marco Torchetti — <a href="https://wa.me/393279703676" style={{color:gold,textDecoration:"none"}}>+39 327 97 03 676</a> — <a href="https://instagram.com/kinkypeoplejamrock" target="_blank" rel="noopener noreferrer" style={{color:gold,textDecoration:"none"}}>@kinkypeoplejamrock</a></p>
      </div>
    </div>
  );
}
