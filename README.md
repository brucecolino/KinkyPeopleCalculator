🎸 Kinky People Cost Calculator — Knowledge Base
Hai estratto con successo il calcolatore di preventivi da una conversazione pesante. Ecco cosa hai:
📦 File nella Knowledge Base
```
├── KPCost_calculator.jsx       (114 KB) — Codice React completo
├── KPCost_Docs.md              (8 KB)  — Documentazione tecnica
├── KPCost_QuickRef.md          (6 KB)  — Guida rapida alle modifiche
└── README.md                   (questo file)
```
🚀 Quick Start
Se vuoi modificare il codice:
Apri KPCost_QuickRef.md per le modifiche comuni (tariffe, extra, lingue)
Se serve dettaglio: KPCost_Docs.md ha la struttura completa
Se vuoi deployare:
```bash
# Scarica il file .jsx da qui
# Su Vercel: upload diretto oppure git push
# L'app girerà automaticamente
```
💾 Cosa è incluso
✅ Tariffazione completa:
Base fee €1.000 (show)
Trasferta dinamica (0-150 km = gratis, >500 km = €1.400+)
Service band (€200)
IVA 22% inclusa
✅ Extra servizi:
Video dedicato (€600)
DJ Set pre/post (€300)
Originali in scaletta (€400)
Wedding package (€500)
✅ Localizzazione:
Supportati 70+ paesi
Tutte le province italiane
Lingue: IT + EN
✅ Output:
PDF stampabile (con breakdown prezzi)
Link WhatsApp per contatti
Tema dorato/nero (Kinky People brand)
🔨 Le tre operazioni che farai di più
1. Cambiare una tariffa
Vedi KPCost_QuickRef.md → sezione "Cambiare le tariffe base"
2. Aggiungere un servizio extra
Vedi KPCost_QuickRef.md → sezione "Aggiungere/Modificare Extra"
3. Aggiungere una provincia/paese
Vedi KPCost_QuickRef.md → sezione "Aggiungere una provincia"
📝 Struttura Logica (ultra-riassunto)
```
User seleziona:
├─ Formato (Jamrock / Tribute) → €1.000
├─ Location (Paese → Provincia → Città) → Calcola distanza da Pescara
│  └─ Distanza → Categoria (local/medium/far/island/abroad)
│     └─ Categoria → Costo trasferta (€0-€2.000+)
├─ Service (Band PA € 200 oppure organizzatore porta suo)
├─ Extras (checkboxes per €300-€700 caduno)
└─ Dati contatto (nome, phone, etc.)

Calcolo:
  Subtotale = Base + Trasferta + Service + Extras
  Totale = Subtotale × 1.22 (IVA)

Output:
  → PDF scaricabile
  → Link WhatsApp per contatti
```
🎯 Why This Approach?
Prima: Una conversazione lunga → ogni modifica consumava token, il chat era lento.
Ora:
📄 Documentazione statica (zero token per leggere)
⚡ Modifiche veloci (copra il codice rilevante da QuickRef)
🧠 Knowledge base compatta (tutto quello che serve)
💬 Chat pulita (inizi conversazioni fresche senza contesto pesante)
Se devi fare una modifica, basta:
Leggere KPCost_QuickRef.md (1 minuto)
Fare il cambio (2 minuti)
Fare una domanda su Claude in una nuova chat (zero contesto "spazzatura")
📞 Contact
Kinky People — Marco Torchetti
📱 +39 327 97 03 676 (WhatsApp)
📷 @kinkypeoplejamrock (Instagram)
---
Created: April 2026  
By: Claude AI + Nesta  
Status: ✅ Production ready on Vercel
