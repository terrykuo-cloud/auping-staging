# AUPING TAIWAN — 全站共用元件／版型權威登記（AGENTS.md）

> **所有新對話串、AI 程式助手、修復工程在修改任何檔案前，必須先閱讀本文件。** 這是一份「修改前的硬性檢查契約」，不是「所有元件已修好」的證書。
>
> **本次文件基準：2026-11-04，GitHub `damienkuo123/auping-staging`，`main` = `cd74b2e95f84de6482d9b87969b191c44cfedf86`。**
> 正式權威永遠是 **GitHub 遠端 `main` 當下的 HEAD＋該 Commit 的實際檔案**，不是這個固定 SHA、舊 ZIP、先前聊天摘要，也不是名為 `CURRENT` 的舊交接文件。HEAD 前進後，本表須重新驗證並更新。
> **重要：本檔目前是新產生的待加入文件，若尚未 Commit 到 `main`，就不能宣稱它已在 GitHub 被保護。**

## 0. 不可違反的工程規則（修改前先讀）

1. **一個功能只有一個控制者。** 先查目前 DOM 使用的 CSS、JS、inline event、原生 `<details>`、第三方 Slick／React 是否已有控制權。已有主人就修原主人，**禁止再疊一支全域 JavaScript 攔截 click、複製事件或直接重寫 HTML**。
2. **不打掉重練已驗收的共用元件。** 保留當前 RC7 Read More 的短文門檻、實體截斷、全文開合、資料來源、原生 owner 特例；保留 U1/U2/U3/U4D、C2、導航、台灣店家、產品選項、Safari 已接受範圍。只修證據確認的缺陷。
3. **共用修復不是全站強制覆蓋。** 同一 `data-section` 未必同一種 DOM 結構／事件 owner／版型；先列出所有命中路由與例外，再修改最小共用責任區域，最後驗證所有受影響家族。`body`、全站 `[class*=...]`、通用 `button` 的 `!important` 預設禁止。
4. **官方實際行為＋畫面＋來源才是對照真相。** DOM 存在、SHA、CI 綠燈、按鈕可點、`aria-expanded=true`、Chrome 模擬 iPhone，單獨都不等於官方 1:1。台灣繁中換行可合理重排；不能因此改掉版型、圖片身份、文章順序與互動結果。
5. **媒體不能猜。** 少圖、影片不可播要先核對官方媒體 URL／本地檔案是否存在及 `currentSrc`、`naturalWidth`、播放時間是否推進；不得拿看起來相似的照片／影片／占位卡替代。
6. **內容不可任意重寫。** 禁止 `innerHTML` 重建既有正文、截取原文、翻譯成沒有來源的敘述，禁止用自行拼湊的 Stories 卡片陣列取代官方首篇大圖＋實際 BlogList 模板。
7. **已通過的頁面優先保護。** 寫入前列出白名單、每檔原始 Git blob/SHA、受影響路由；只修改有證據的元件。同步驗證 1440px desktop、390/440px mobile（真實 iPhone Safari 另行人工驗收）、hover/focus/swipe、媒體與相關路由。不要把舊代表性 PASS 推廣成全站 PASS。
8. **`main` 是唯一工作版本，沒有平行版權威。** 不擅自 Push、Reset、Force Push、還原已接受的 88 檔；Mac 有未提交異動先比對、決定保留或撤銷，絕不覆蓋。最終只在使用者確認後於 `main` Commit／Push，並記錄新 HEAD。
9. **有既有 owner 就先追查既有 contract，找不到才能設計新 owner。** 新 owner 需有明確 selector、作用路由、排他性標記、雙控制器衝突測試、官方對照及回退方案；不准因某頁沒反應就新增通用攔截器。
10. **修復範圍依元件家族，而非回報的單一頁面。** 但「同一套程式碼」與「全部路由已正確」要分別登記，不能互相推論。

## 1. GitHub 中已存在的主要控制權與模板

下表是 **`cd74b2e` 真實 GitHub 來源程式／歷史驗收契約** 的交叉核對。`存在` 表示程式已存在，**不代表完整端對端驗收**。本文件本身不改任何 runtime。

| 元件／領域 | 現存 owner／檔案 | 作用、既有規則（修改前保護） | 風險與現況 |
|---|---|---|---|
| **Global Navigation／搜尋／Mobile Menu** | `assets/rc7-runtime.js`, `assets/rc7-runtime.css`; `assets/auping-shared/mobile-menu-v200.css`; `assets/rc73-page.js`; `assets/rc76/store-link-guard.js` | RC7 為導覽與 Read More 的核心橋接；mobile-menu CSS 是預防未開啟選單遮擋點擊，不是重建選單。 | **共用高波及**；舊資料顯示 RC7 被數百路由引用。保持既有翻譯與導航；全站 Safari 尚未完成驗收。 |
| **Read More / TruncatedText** | **`assets/rc7-runtime.js` → `setupReadMore()`**；部分頁面另有 *native disclosure owner* (`data-auping-disclosure-control`／`data-auping-disclosure-key`) | 現有 RC7 用**實際渲染文字行數**判斷：≤3 行及沒有實質截斷時顯示全文、隱藏按鈕；必要時依第 3 行實際座標折疊；展開應真的恢復完整文字高度。依 PROVEN/NO_BUTTON/SOURCE_REQUIRED 名單保護原文，遇 native owner **跳過**。保持官方透明／白底初始樣式及收合外觀。**不要自行指定字元數量或 `max-height:4.8em`。** | 歷史清冊 284 個路由使用 TruncatedText；**Molton 的 native owner 與按鈕／層級目前故障**，不是批准新增第二個 ReadMore controller。 |
| **Product Header／General Info／Overview／Options** | 各商品頁原始 HTML＋CSS、`assets/snapshot-interactions.js`、`assets/rc75-combobox.js`、依家族不同的規格與產品選項邏輯 | 保留名稱、價格、產品身份、變體/combobox、gallery 原始 HTML、CTA、資料來源；不以其他產品模板直接覆蓋。 | 相關產品模板遍布多頁；不能假設一份全域 CSS 可套所有家族。 |
| **Product Specifications** | `assets/auping-shared/product-specifications-v1.js` | 只在頁面標註 `[data-auping-spec-contract="v1"]` 時啟用；控制規格表前三行／更多規格及 anchor；不碰 Gallery、Read More、導覽與篩選。 | **只找到有限 opt-in，不能因有 227 個 ProductSpecifications 模板就說 227 頁都有此 controller。** 原 88 檔規格代表案例在 `beds/noa-soft-white-oak` 等，注意不要混淆 `beds/noa`。 |
| **Catalog U1/C2（床架／Box Springs）** | `assets/c2-catalog/controller.js`, `facet-engine.mjs`, `ui-contract.mjs`, `controller.css` | U1/C2 只處理其明確路由；已有 shared card/gallery/filter 與狀態控制，不得新增第二個 owner。 | `controller.js` 在 `cd74b2e` 仍列 **ARCHITECTURE_DECISION**；英文回退、page2、篩選組合需重驗。 |
| **U2 Standard Product Catalog** | `assets/u2-standard/u2-standard.mjs`、`.css` | 標準商品卡 DOM adapter；原註解明確要求**不得**改產品文字、徽章、CTA、色片、篩選歸屬；現有 U1／RC7 分工需依實際載入鏈確認。 | 不能在各商品卡重新搭建孤立 gallery。 |
| **U3 Special（Mattresses／Circular Mattresses landing）** | `assets/u3-special/u3-special.mjs`、`.css`、`assets/finalv2-mattress-geometry-v120.css` | 特殊床墊 landing 的 DOM 結構保護與版型；程式自述**不新增互動 owner**。 | 不能錯把 U3 當六款床墊 detail 的萬用模板。 |
| **U4D 標準篩選** | `assets/u4d-standard/owner.mjs`、`.css`; 另有 `assets/u4b-official/u4b-filter-owner.mjs` | 已有官方選項 evidence、facet/URL/篩選/分頁邏輯；U4D 跟 U1／U2 的事件責任須分開。 | 歷史 9 類、10 route，非宣告每個產品 listing 已驗收。 |
| **ModelSlider（非一般 Gallery）** | `assets/snapshot-interactions.js` → `setupModelSlider()` | 已有 transform/Slick fallback，原註解：**僅兩個已知 ModelSlider 路由**。保護卡片順序、transform 與手機滑動。 | **不能拿它的 selector 直接修 ImageGallery、CtaInspirationComponents 或其他輪播。** |
| **ImageGallery／商品主圖與縮圖** | 原始 page HTML＋CSS／可能的 source-owned gallery；**尚未確認一個已通過全家族驗收的統一 owner** | Gallery 主圖、縮圖 active、slide 及 modal/zoom 是不同狀態，必須逐一驗證。 | 歷史清冊 9 route；Noa 有空白圖片、圖片無法放大／點擊與切換欠缺，**不得宣稱已修復**。 |
| **CtaInspirationComponents／相關床架輪播** | 各頁原始 `CtaInspirationComponents` 區塊／其 CSS；需要查 runtime owner | 確認 Essential「其他床架」用的實際 slider class，再在該**元件家族**實現原尺寸與行為；不得改頁面其他圖片。 | 46 route 使用同類 section；Essential 左右在被拒收的 Batch1 曾能動，**該補丁已拒收，不是可靠共用成果**。 |
| **VideoPlayer／Media** | `assets/snapshot-interactions.js` 的 native video controls；`assets/auping-shared/w4-safari-official-video-v110.js`; `assets/auping-shared/p0e-essential-only-v1.css`; `assets/finalv2-mattresses-video-v110.js` | W4 Safari video 修補只鎖 `/mattresses/` 與 `/bed-linen/` 特定影片；P0E CSS 僅 Essential 桌機 native video。**不更換媒體、不能用 poster 冒充播放**；檢查 currentTime 前進。 | 19 route 使用 VideoPlayer；Noa 影片未驗收、Essential 桌機曾接受但手機官方例外，須保護。 |
| **BlogList／文章首頁** | 原始 `/stories/`／`/news/` HTML `BlogList`、`RelatedBlogs`、頁面版型；動態資料可能另有來源 | 保留官方**首篇大圖、分類導航、長頁卡片/排列順序**及媒體身份，先確認官方資料來源。不能拿其他文章頁縮圖組成自製三欄首頁。 | 歷史 BlogList 2 route；Stories 尚有圖片／內容缺失。**Batch1 三欄 fallback 已拒收**。 |
| **Mattress Product Detail（六款）** | `mattresses/{one,two,evolve,revive,elysium,elite}-mattress/index.html` 與各頁 CSS；ProductHeader／Specifications／RelatedProducts 等原有機制 | 版型要以官方完整 section 順序、媒體／比較 CTA／實際文字對帳，相關產品資料分開，不能從 one-mattress 複製一張內容版。 | Two 仍 **VISUAL_FAIL**；其他 5 款內容與版型未完成正式認可。不可把 P0D geometry-only PASS 當 1:1。 |
| **Taiwan Store Locator／店家連結** | `assets/rc76/taiwan-store-locator.js`, `assets/rc76/store-link-guard.js` | 保護台灣 Leaflet／OSM 與 6 店家，保留本地/官方服務 exit 的已核准範圍。 | 對 StoreLocator 類元件的修改需驗地圖和其他路由連結。 |
| **網站字型／RWD／Safari geometry** | `assets/auping-shared/w4-safari-media-geometry-v1.css`, `assets/auping-shared/mobile-menu-v200.css`, 各 route 原 CSS | 共用樣式只處理來源證明過的 section/媒體容器；不能用全站 !important 覆蓋空間／圖片比例；手機圖片零高度鏈需保護。 | 部分 Safari 代表性 PASS，但不是所有 iPhone 頁面已驗收。 |

### 1.1 這些是「GitHub 已存在的檔案」，不是「可以重寫的空白架構」

`cd74b2e` 查到的 Git blob SHA（**Git Blob SHA-1，不是 SHA-256**；供 Git 逐檔比對）：

| 受保護檔案 | Git blob SHA（建立登記時） |
|---|---|
| `assets/rc7-runtime.js` | `8aea4a7f62fe29a35de028977364ea2a44f1597d` |
| `assets/snapshot-interactions.js` | `48ae51de84f3fcf47ee1597e24f42ec66638c12c` |
| `assets/rc73-page.js` | `18ae790adc3b4b9bf56bed2e7478c882d35aa92f` |
| `assets/rc75-combobox.js` | `7cd3f9b80501bb3f6b1ef0b59c3fc1c42b66d469` |
| `assets/auping-shared/product-specifications-v1.js` | `001d44837b83576d0294098b490d4bfa75cca031` |
| `assets/c2-catalog/controller.js` | `069f0bd07460fa9ed93fa3f94b701da833a50194` |
| `assets/u2-standard/u2-standard.mjs` | `f37ed7bacb4a66764037c94ab0e92d5ba7d5ac61` |
| `assets/u3-special/u3-special.mjs` | `0240f7fedac88faaa470695769c83246e3ba2016` |
| `assets/u4d-standard/owner.mjs` | `d0ef6ada676d9d6d5947b392ba9eccd61d8a97cf` |
| `assets/auping-shared/mobile-menu-v200.css` | `1fa961349450b77d025cb9731dc9682484042ef6` |
| `assets/auping-shared/p0e-essential-only-v1.css` | `9aaae2f7cee5893f326e08c5c9705e20b2357ccc` |
| `assets/auping-shared/w4-safari-media-geometry-v1.css` | `6534e91434aa7ce80d0ad0c4eda8450ed009e9ca` |

**每次改檔前**要重新算 Git Blob SHA、查 HEAD 和載入頁面；上表只保護本次建檔基準，不是永久鎖死未來合法修改。

## 2. 既有結構類型／家族路由關聯

以下是 **2026-10-31 P0G 封存元件清冊＋2026-11-03 88 檔交叉整理**，**尚不是 2026-11-04 目前 Mac 全站實際互動驗收**。這張表的用途是 **搜尋影響面**；真正寫入前要在當下 HEAD 重新掃描命中，並記錄例外。

| 現有 `data-section`／模板族 | 歷史命中路由數 | 允許繼承的部分 | 不允許直接推論 |
|---|---:|---|---|
| `TruncatedText` | 284 | 尋找 RC7 / native owner 與 Read More 保護區 | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `ProductSpecifications` | 227 | 尋找規格表 owner 與內容身分 | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `ProductGeneralInfo` | 216 | 資料與說明、不可跨產品覆寫 | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `ProductHeader` | 152 | 保護產品身份／選項與來源 | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `TwoColumn` | 78 | 版型及 responsive 欄寬 | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `RelatedProducts` | 49 | 相同卡片元素但不同推薦商品 | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `ProductOverviewHeader` | 49 | 僅作元件使用／相似版型發現 | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `CtaInspirationComponents` | 46 | 同一元件族、不同內容與動態狀態 | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `HeaderText` | 44 | 僅作元件使用／相似版型發現 | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `HeaderImage` | 44 | 來源圖片、裁切與版型 | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `BlogAttributes` | 41 | 僅作元件使用／相似版型發現 | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `Image` | 39 | 僅作元件使用／相似版型發現 | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `RelatedBlogs` | 27 | 僅作元件使用／相似版型發現 | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `StoreLocator` | 20 | 僅作元件使用／相似版型發現 | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `VideoPlayer` | 19 | 同一播放器型別但影片身份需驗 | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `UpSellProducts` | 16 | 原商品 CTA/內容 | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `ProductCatalog` | 14 | Catalog 按 route 決定 U1/U2/U3/U4D owner | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `ImageGallery` | 9 | 同一區塊外觀／媒體，但控制器仍需查 | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `CtaHeader` | 6 | 僅作元件使用／相似版型發現 | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `ProCon` | 6 | 僅作元件使用／相似版型發現 | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `UspContentBlock` | 5 | 僅作元件使用／相似版型發現 | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `CategoryTiles` | 5 | Safari 圖片幾何保護 | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `FaqAccordion` | 3 | FAQ 原生展開 owner | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `CtaBasic` | 3 | 僅作元件使用／相似版型發現 | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `Auping Design Studio` | 3 | 僅作元件使用／相似版型發現 | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `ModelSlider` | 2 | `snapshot-interactions.js` scoped fallback | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `OverviewTiles` | 2 | 僅作元件使用／相似版型發現 | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `BlogList` | 2 | BlogList 版型與文章資料對帳 | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `ProductCategories` | 1 | 僅作元件使用／相似版型發現 | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `CtaProduct` | 1 | 僅作元件使用／相似版型發現 | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `Frans de la Haye` | 1 | 僅作元件使用／相似版型發現 | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `Claudia Köhler & Irmy Wilms` | 1 | 僅作元件使用／相似版型發現 | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `Eva Harlou` | 1 | 僅作元件使用／相似版型發現 | **不可據此判定同家族互動、內容或視覺全部 PASS** |
| `RichContentTiles` | 1 | 只有單頁專用，勿推成全站 | **不可據此判定同家族互動、內容或視覺全部 PASS** |

### 2.1 路由影響範圍如何取得

上表是 **34 類 section 在歷史 384 路由清冊中的分布**，不是固定授權的修改名單。

- 修改 `ImageGallery`：先查當前 `main` 中 **全部** `section[data-section="ImageGallery"]` 頁面；Noa 另有主圖／縮圖 DOM，必須辨識是否同一 owner。
- 修改 `CtaInspirationComponents`：先查全部 46 個歷史路由與當前 `CtaSlider` DOM／事件；不要直接套 `ModelSlider` 選擇器。
- 修改 Read More：先查 `ReadMore_base`／`TruncatedText` 以及 `data-auping-disclosure-control`、`data-auping-disclosure-key` 的例外。
- 修改 BlogList：先查 `/stories/`、`/news/` 的原版模板、首頁大圖、官方文章資料來源。
- 修改床墊：逐一核對 `/mattresses/one-mattress/`、`/two-mattress/`、`/evolve-mattress/`、`/revive-mattress/`、`/elysium-mattress/`、`/elite-mattress/`。
- 修改 RC7、`snapshot-interactions.js` 或共用 CSS：先列**所有實際引用資源的頁面**；不能只查 `data-section`。

歷史全路由關聯資料保存在 2026-11-03 封存 `Auping_Main_cd74_Sitewide_Component_Family_Closure_READONLY_20261103.zip` 的 `REPORTS/PRECHECK_FAMILY_COUNTS.csv` 與 `DATA/ARCHIVED_P0G_LOCAL_SECTIONS_2732.csv`（非目前 HEAD）。**不必製作新的全站掃描 ZIP；應直接在現行 Git 工作樹唯讀搜尋並核對變更影響。**

## 3. 已驗收／未驗收／被拒絕 — 絕不混為一談

| 功能 | 目前可作為基礎的證據 | 目前禁止宣稱 |
|---|---|---|
| W1–W4／P0E 既有成果 | `main=cd74b2e` 已部署的 88 檔、來源與 release ledger (`docs/releases/AUPING_20261103_88_SOURCE_LEDGER.json`) | 整個網站／所有同家族頁面均 1:1 PASS |
| RC7 Read More | 已存在共用程式、三行渲染截斷與 native owner 排他規則 | Molton 完整正常、所有 TruncatedText 已驗收 |
| Noa 規格 | 有 opt-in 共用 JS 與 W1 代表案例 | Noa /beds/noa/ 的四圖 gallery、缺圖、播放／放大都 PASS |
| Essential 桌機影片 | P0E 曾獲得限定 Desktop 實際播放接受，CSS 維持獨立 | Essential 所有互動（尤其「其他床架」）都 PASS；手機改成與官方不同的播放行為 |
| C2／U4D 目錄篩選 | 已有 owner，產品族路由明確存在 | page2、篩選組合、繁中回退全數回歸完成 |
| Stories | 原本 HTML 與官方首頁截圖可當版型基準 | 拿自行拼的十篇文章視為官方相同文章順序與大圖排版 |
| Six Mattresses | `Two` 曾通過幾何限定測試，其餘有 source draft | `Two` 整頁 1:1；六款文字與版型已全部正式認可 |
| **2026-11-04 被拒絕 Batch 1** | Mac 曾以局部 JS/CSS 讓兩個輪播能動；使用者實測回報重大回歸 | **不得合併／不得升格為共用元件！** |

### 3.1 2026-11-04 反例：Batch 1 明確拒收，避免重演

先前未提交的本地改動（**GitHub `main` 內不存在**）：

- `assets/rc7-runtime.js` 增加一個共用載入器；
- `assets/auping-shared/family-interactions-v1.js`；
- `assets/auping-shared/family-interactions-v1.css`。

**拒收原因**：攔截 Read More 事件、強行重寫全文與高度／樣式，破壞 Molton 既有契約；以十篇文章組合的 Stories 三欄列表取代官方首篇大圖版型；Noa 仍有空白圖片和無法打開的圖片。部分輪播能動並不能抵消上述破壞。這些檔案不可當作已接受 shared owner、不可再次直接推廣全站。

**本地復原狀態（2026-11-05 01:02 前置報告）**：使用者 Mac 唯讀檢查 `Auping_Local_Status_READONLY_20261105_010205.zip` 證實 `HEAD=cd74b2e...` 且上述三個 Batch 1 變更都與拒收原版 SHA 完全相同，無其他未提交變更。**此證據只代表「可安全做精準回復」，不代表已回復成功**；應以隨後的 `RESTORE_SUCCESS` 報告及 `git status` 為準。不得使用 `git reset --hard`。

### 3.2 已知五組待修工程（以「家族」為單位，而非五頁個別 patch）

1. `/beds/noa/`：VideoPlayer 官方影片 source/playback；ImageGallery 缺圖、四張圖片主圖切換、點圖/放大；同家族頁一起列入回歸。
2. `/bed-linen/mattress-protectors/molton-mattress-protector/`：**先查 native disclosure owner 與 RC7 跳過規則**，修原有控制器的事件／層級／正文來源，還原官方透明／白底按鈕，不重寫短文門檻。所有相同 native owner 頁一起驗收。
3. `/beds/essential/`：「其他床架」CtaInspirationComponents／CtaSlider 箭頭與滑動，保持已接受 Desktop video 不變，查同家族。
4. `/mattresses/two-mattress/`：整頁 section 順序、內容、官方圖片及 RWD 大幅不符；和六款床墊模板整體對帳，禁止套入未核准的 Two 結構或錯誤共用 CSS。
5. `/stories/`：BlogList 內容載入、首篇大圖、分類、卡片與版型；並查 `/news/` 等同元件使用頁，依官方來源而非自製列表修復。

## 4. 每次修復的 **PRECHANGE GATE**（不做就不能開始改檔）

所有對話串／工程助手開工時必須在工作紀錄中填完以下八欄（UNKNOWN 即 STOP，不得把 UNKNOWN 寫成 PASS）：

| 必填欄 | 正確做法 |
|---|---|
| `CURRENT_MAIN` | 從 GitHub 重新取得遠端 `main` HEAD；檢查本地分支／dirty 檔案；不要直接用這份文檔建立時的 `cd74b2e` 充當最新。 |
| `EXISTING_OWNER` | 用搜尋定位 DOM selector／既有事件 owner／script 引用，包括 inline JS、RC7、native disclosure、U1/U2/U3/U4D、snapshot-interactions；沒有查完不能再加新 handler。 |
| `TEMPLATE_AND_DATA` | 列出 `data-section`、版型相同與不同的路由；明確區分「呈現模板」「資料」「互動控制器」。 |
| `AFFECTED_ROUTES` | 真正列出所有引用同一資源／元件的路由，不能只列使用者回報的單頁；有例外就註明。 |
| `EXISTING_ACCEPTANCE` | 清楚寫出既有通過的是 Source/SHA、Chrome 功能、Safari 人工代表性、Geometry 還是完整視覺；保護其界線。 |
| `OFFICIAL_TRUTH` | 官方對應頁／區塊 UUID／來源圖影片／完整正文、桌機和手機對照；官方取得失敗標 UNKNOWN，不能編造。 |
| `MINIMAL_PATCH` | 說明修改哪個**原有 owner**，是否有替代方案；列白名單、衝突與回復方式，不得全域注入未知相容性的 CSS/JS。 |
| `REGRESSION_AND_RECEIPT` | 功能要有真實狀態改變（主圖、全文、currentTime），同家族 Desktop + Mobile 受影響路由驗證，失敗記錄，才可要求使用者驗收及 GitHub Desktop Commit。 |

**更新本檔是每次合法修改的一部分**：若 owner、routes、例外、驗收狀態改變，必須與程式碼放在 **同一個 main Commit** 更新表格及證據路徑，不能留在聊天訊息、下代 ZIP 裡。

## 5. 既有正式規範與資料所在（不要把「舊版本說明」當最新 HEAD）

- `docs/08_EFFECTIVE_1_TO_1_PARITY_ACCEPTANCE_CONTRACT.md` — 有效 1:1／媒體與互動證據的正式準則（但內含 262 route 的舊版統計，**不能取代目前 384 路由清冊**）。
- `docs/ROUND3_SHARED_READMORE_BRIDGE7_20260912.md`、`data/parity/round3-shared-readmore-runtime-v1.json` — RC7 早期 Read More 共用修復及跨模板繼承歷史，不要因為它早就存在就另寫第二個。
- `docs/releases/AUPING_20261103_88_SOURCE_LEDGER.json`、`docs/releases/AUPING_20261103_DIRECT_MAIN_88_WIP.md` — `cd74b2e` 真實的 88 檔變更權威、10 個硬性 hold 與 release 狀態。
- 舊 D0/D1/D2/P0G/10-30 handoff 封存（不在 main）：可參考的 **歷史** route/family/section/owner 影響證據；不得以 10-30 / 11-02 當成 11-04 已修好。
- `docs/AI_HANDOFF_CURRENT.md`、`docs/07_ROADMAP_NEXT_STEPS.md` 目前仍含 **2026-08** 舊 HEAD；**不能依其「CURRENT／AUTHORITATIVE」字眼直接切回舊程式權威**。

## 6. 下一個對話串的開頭操作規範

> 這是 Auping Taiwan 官方 Effective 1:1 Parity 專案。GitHub `damienkuo123/auping-staging` 的即時 `main` 是唯一程式碼權威。**先抓 HEAD，再讀根目錄 `AGENTS.md`，再讀 `docs/releases/AUPING_20261103_88_SOURCE_LEDGER.json` 與現存 JS/CSS owner。** 先查已存在的共用元件、模板、功能與驗收狀態，再以同家族範圍修改最少來源檔。禁止第二個 Read More／Slider／Gallery 控制器、禁重排 Stories、禁編造內容、禁只修回報頁。工作樹如果有未提交 Batch1，先釐清復原，不得覆蓋。沒有官方／實機證據不得宣布 1:1。所有合法的新 owner／套版變化，跟著同一個 main Commit 更新 `AGENTS.md`。不要自行 Push。

---

**狀態說明：** 本文件是「現存資產索引＋禁止事項＋已知 hold＋家族待辦＋修改前門檻」，**不是網站已全部修復／驗收的證明**。路由關聯表來自歷史檔案；若與現行程式不同，以現行遠端 `main` 為準並更新此檔。


## 2026-11-05 獨立台灣副本：新聞入口修復

本次權威為使用者授權的 `terrykuo-cloud/auping-staging`，非原始 damienkuo123 專案。修正 `/news/` 原有 10 張 BlogList 卡片的標題、摘要與文章入口；順序、圖片、版型及共用控制器均保留。新增 `/news/auping-publishes-csr-report-2022/`，正文、區塊與媒體來自官方同名 `/en/news/` 頁面並翻譯為繁體中文。其餘 9 篇既有中文文章沿用。RC7 setupReadMore 繼續為全文開合唯一控制者。此為新聞內容／連結修復，不代表全站、手機 Safari 或其他元件已通過驗收。


## 2026-11-06 獎項分類對應修復

`/news/awards/` 現對應官方 `/en/news?tags=awards`，使用官方 BlogList 原有排列與媒體，共 13 則、2 頁；第 2 頁為 `/news/awards/page-2/`。原 bridge 頁面的 rc7-local-pages 不再於此路由載入，改用既有新聞頁殼與 RC7 共用控制器；未修改任何共用 JS/CSS。標題及摘要為繁體中文，已有站內文章優先使用站內路徑，尚未複刻的文章保留官方網址。新聞首頁獎項入口連往此分類。此紀錄不代表其他分類或全站驗收。


## 2026-11-08 獨立副本新聞完整入口與中文文章

以 terrykuo-cloud/auping-staging main 1ceb4b6422a841fd2a6b29d81efce22dea6aa2f1 為修改基準，官方新聞 5 頁共 44 則（其中 1 則位於 stories），九分類 12 個結果頁，均沿用官方 BlogList HTML、順序與媒體。新增 13 篇逐段繁體中文文章，包含原先六篇外連獎項文章；現有文章只校正 main 內站根目錄及分類連結。分類及分頁由原生 anchor 導覽，無新增全域 click owner。RC7 setupReadMore 及所有共用 JS/CSS 保持原樣。新文章 RelatedBlogs 保留官方卡片，原靜態 Slick 沒有對應 runtime，僅以 data-news-related=native 範圍的原生水平捲動提供完整卡片存取，無第二個 JS 控制器。歷史日期保留；動物文章修正原文果蝠段落人／動物標籤顛倒，醫療描述標示歷史背景。證據在 docs/news-completion-20261108.json。這次驗證限新聞家族，不宣稱全站或真實 iPhone Safari 1:1。


## 2026-11-08 新聞圖片透明回歸修復

上次官方 DOM 擷取留下 LazyImage 未載入樣式，靜態頁沒有 React load 回呼，造成圖片 naturalWidth 非零但 opacity 為 0。只在本次新聞範圍 main 的 img 補上既有 LazyImage_loaded__h_K__ 可見狀態，保留 loading=lazy、圖片 URL、srcset 及版型；未新增 JS owner 或修改共用 CSS。之前連結測試不能代表圖片已驗收，圖片驗收以 docs/news-images-20261108.json 及捲動後實際顯示為準。

第二項圖片回歸：絕對 /_next/image 網址轉換後殘留官方網域，形成 www.auping.comhttps://api.auping.com。僅修正新聞 main img 的重複前綴，並對所有唯一圖片來源執行 HTTP 與 MIME 驗證；圖片身份、srcset 寬度、內容及版型均保持。


## 2026-11-08 新版首頁

首頁依官方即時 /en 的九個區塊與 USP banner 建立繁中版本，先在 /home-preview/ 驗證。官方時間軸 inline script 為此時間軸唯一 owner；home-2026/home.js 僅接管新影片暫停按鈕，既有 snapshot-interactions 仍控制來源與自動播放；RC7 及共用 CSS/JS 保持原樣。新 CSS 限定 data-home-2026 範圍。驗證及正式上線狀態見 docs/homepage-20261108.json，不宣稱真實 Safari 或全站 1:1。

正式首頁現採用已通過預覽檢查的同一份新版內容；1440px 桌面影片播放時間推進與暫停／恢復、時間軸箭頭與鍵盤邊界、390/440px 手機圖片與導覽及 440px 時間軸拖動已實測。/home-preview/ 保留為相同內容的檢查入口。官方外部配置工具保留原連結，連線未驗證成功。


## 2026-11-08 移除官方客製化工具入口

依使用者的原廠規範要求，移除全站指向 configurator.auping.com 的文字、按鈕與 SVG 圖示入口，包含 en-gb、nl-nl 及商品 permalink。原 ProductCardImageSlide／CategoryTiles 商品圖片錨點改為相同 class 的非互動 div，保留所有媒體、輪播按鈕及排版結構。rc3-final.js 僅移除其產生的設計訂購 CTA。沒有增加 click 攔截器，也未修改 RC7、C2、Read More 或共用 CSS。非目標連結、圖片影片標籤、HTML script 區塊逐檔比對不變；清冊見 docs/configurator-removal-20261108.json。歷史資料 JSON 保留作來源紀錄，不代表提供客製化入口。

同時移除既有 data/rc6-routes.json 與 data/rc6-search-index.json 中唯一 service-configurator 記錄，避免搜尋重新提供官方客製化出口；其餘路由與搜尋資料保持。


## 2026-11-08 Kiruna 繁體中文內容

僅翻譯 /box-springs/kiruna/ main 內英文文字節點，包含布料系列、床頭板高度、七區支撐、設計引言、門市按鈕及地圖文字。依使用者限制，配置器宣傳段落改為門市搭配諮詢；未恢復客製化入口。HTML 標籤逐字比對不變，圖片、連結、版型、RC7 閱讀更多、rc73 與 rc76 控制器均保留。記錄見 docs/kiruna-translation-20261108.json。

Kiruna 頁尾追蹤／認證／常見問題文字與麵包屑的輔助閱讀標籤亦完成中文化；只修改文字及 aria-label，不更動功能。


## 2026-11-09 Criade 繁體中文內容

僅中文化 /box-springs/criade/ 的布料系列、床頭板與床尾板、床墊支撐、設計引言、頁尾及輔助閱讀標籤。依使用者要求，線上配置器說明改為門市搭配諮詢。標籤比對僅兩個 aria-label 文字不同，其他連結、圖片、CSS、JS 及既有控制器保持。記錄見 docs/criade-translation-20261109.json。


## 2026-11-09 床架 Noble 輪播入口

Noble 原本已是 /beds/ ModelSlider 第五項，桌面版因既有 setupModelSlider 僅 mobile boot 而未綁定箭頭。只為 beds 指定區塊加入 data-auping-model-all-breakpoints，沿用原 controller，桌面移動上限依可視寬度計算並更新可見卡片語意；手機原觸控分支保留。未標記路由仍維持原 mobile-only 行為。無新增 click owner、無 CSS／圖片／卡片內容改動；證據與白名單見 docs/beds-noble-slider-20261109.json。


## 2026-11-09 Noble 繁體中文內容

僅中文化 /beds/noble/ 的布料、設計師介紹與引言、靠墊、床腳、床邊桌、床頭板、實木永續設計、得獎資訊及頁尾。配置器說明依使用者限制改為門市諮詢，平台數字註明原文資料背景。標籤僅麵包屑 aria-label 文字不同；圖片、連結、腳本與 CSS 保持。未改動 /beds/ 已修復的輪播。記錄見 docs/noble-translation-20261109.json。


## 2026-11-10 床墊三項技術介紹彈窗

僅 /mattresses/ 的 RichContentTiles 三個按鈕啟用 mattress-features/modal.js。原靜態快照無彈窗 owner；新增原生 dialog、頁面專用 CSS 與三份繁中內容 template，影片／封面來自官方實際彈窗。影片置於 shadow root，避免 snapshot-interactions 全域自動播放與來源改寫重複控制；共用程式碼完全保留。關閉及 Escape 停止影片、還原焦點與捲動；桌面雙欄、手機單欄。其他頁面、卡片排列、商品連結及循環床墊影片均不修改。範圍與來源見 docs/mattress-features-20261110.json；不宣稱真實 Safari 1:1。


## 2026-11-11 枕頭移至寢具導覽

依使用者指定分類，RC7 在既有導覽事件綁定前執行 groupPillowsUnderBedding，將原枕頭商品卡樣式用於寢具底下的枕頭分類入口，連至既有 /bed-linen/pillows/ 三款商品目錄，移除桌面與手機頂層枕頭項目。沒有新增全域事件 owner，未更改 373 頁正文、商品網址、Read More、篩選或媒體。原目錄及 Cloud/Nest/Dew 商品完整保留。全站載入範圍與原始 blob 見 docs/pillows-navigation-20261111.json；不代表全站所有其他互動已驗收。
`n電腦導覽容器可能是 nav 外層而非 ul；分類搬移透過既有 data-auping-desktop-item 標記定位，不依賴直接子層。

選單更新同時更換 373 頁的 RC7 script 版本參數，避免舊快取；僅此資源查詢參數改動，頁面正文與其他資源不變。


## 2026-11-11 台灣床墊供應範圍

依使用者確認，移除 One／Revive：全站桌面與手機靜態導覽卡片、床墊總覽與推薦卡、搜尋及商品資料同步移除。床墊總覽保留 Elite、Elysium、Evolve、Two，U3 既有數量檢核同步改為四款。兩個舊商品頁改為 noindex 導向床墊總覽，RC7 route alias 同步。歷史飯店新聞保留事實敘述但取消已下架商品連結，歷史 parity 文件不改寫。無新增 JS owner，其他頁面正文與既有枕頭分類、影片彈窗保持。範圍及來源 blob 見 docs/unavailable-mattresses-20261111.json。


## 2026-11-11 移除床墊外部比較按鈕

依使用者要求，僅移除 /mattresses/ ProductCatalog 標題旁「比較所有床墊」外部連結。其餘 HTML 逐字保留，未修改 U3、RC7、共用 CSS/JS、四款床墊或影片彈窗。來源與範圍見 docs/mattress-comparison-removal-20261111.json。


## 2026-11-11 移除手動可調式床底

依使用者要求，移除手動可調式床底的全站導覽卡、床底總覽商品卡及搜尋資料；舊商品網址導向床底總覽。總覽介紹僅刪除手動調整商品描述，保留電動床底說明。其他頁面正文、固定式及電動床底、支援資料與共用控制器保持。證據見 docs/manual-base-20261111.json。

手動床底卡片移除時一併移除其空白 grid 包裝，避免保留空位；既有三欄排版與 U4D owner 不變。


## 2026-11-11 原廠新版床底家族

床底總覽及固定式、電動 1M/2M/3M 五頁 main 依原廠即時 DOM 更新並中文化；總覽改用新版介紹卡、影片與圖集，取消舊篩選版型及該頁 U4D/U4B 載入。手動床底不加入；1M 的手動腳部調整為該產品功能，保留。3M 規格誤植手動類型依同頁三馬達功能校正。RC7 導覽／閱讀更多、RC75 尺寸選項沿用，規格採既有 specifications-v1 opt-in，無共用程式改寫。保留台灣門市及禁止配置器入口。官方 CSS 限定 data-bed-bases-2026。證據與例外見 docs/bed-bases-refresh-20261111.json。

總覽兩支新影片使用原生 video controls 與宣告式 shadow root，隔離既有全域影片自動播放；不新增事件控制器。

新版 UspContentBlock 原廠 React/Slick 在靜態副本沒有事件 owner；僅該總覽以原生 overflow/scroll-snap 顯示三項，保留原圖與文字，手機支援左右滑動及鍵盤，不新增 JS 控制器。


## 2026-11-11 台灣枕頭僅保留 Cloud

移除 Nest/Dew 枕頭導覽、目錄、相關推薦及搜尋入口；舊網址導回枕頭目錄。U4D/U4B 枕頭會員及篩選選項縮至 Cloud。Nest/Dew 棉被完全保留；歷史文章僅取消停售枕頭連結。無共用 JS/CSS 修改，無新增事件 owner。其他頁面 main 逐字比對不變（兩個相關推薦及兩篇歷史文章除外）。詳見 docs/pillows-assortment-20261111.json。


## 2026-11-11 移除台灣未引進的寢具分類

移除保潔墊、枕套、床罩的導覽及寢具分類卡，相關分類與商品舊網址導回寢具總覽；同步移除搜尋、商品資料與分類篩選資料。其他頁面 main 逐字不變，寢具新舊總覽僅移除目標卡片。被套、棉被、床包與 Cloud 枕頭保持。共用 JS/CSS 及事件 owner 完全不變。詳見 docs/bedding-assortment-20261111.json。


## 2026-11-11 原廠新版寢具總覽

僅 /bed-linen/ main 依官方 /en/bedding 更新並中文化，保留四個分類目的地。Cloud 替換官方 Dew 枕頭情境圖；移除保潔墊宣傳，保留床包照片。門市沿用台灣資料。新增 CSS 僅 data-bedding-2026 範圍；四個影片以 shadow root 隔離現有全域媒體腳本，page.js 僅控制本頁播放／暫停。其他頁面與共用 JS/CSS 不變。詳見 docs/bedding-refresh-20261111.json。


## 2026-11-11 薄墊新版總覽與名稱統一

/toppers/ 與 /mattress-toppers/ 兩個總覽入口依原廠即時新版 main 中文化，三款介紹卡與分割式、材質、保養資訊更新；保留六款本地商品入口與台灣門市。僅兩總覽移除舊 U4D/U4B 篩選載入。全站既有名稱統一改為薄墊，其他頁面僅原名稱文字替換及對應腳本快取版本更新，無功能或媒體改動。新增 CSS 限 data-toppers-2026，無新事件 owner。詳見 docs/toppers-refresh-20261111.json。


## 2026-11-12 薄墊總覽列出全部台灣門市

既有 mountEmbedded 改為接受 data-auping-dealer-show-all opt-in；僅兩個薄墊總覽設定 true，其他路由仍前三間。沿用單一 Leaflet/list owner，六筆門市資料不變。薄墊專用 CSS 解除清單高度限制，六間完整列出。記錄見 docs/toppers-all-stores-20261112.json。


## 2026-11-12 床墊總覽列出全部台灣門市

僅 /mattresses/ 啟用既有 data-auping-dealer-show-all 並解除該頁清單高度限制，直接列出六間門市。沿用現存門市與地圖 owner，無共用 JS/CSS 修改，床墊卡片與技術彈窗保持不變。詳見 docs/mattresses-all-stores-20261112.json。


## 2026-11-12 床底與寢具總覽列出全部台灣門市

僅 /bed-bases/ 與 /bed-linen/ 啟用既有門市 show-all opt-in，頁面限定樣式解除清單高度限制，完整列出六間門市。共用 JS/CSS、門市資料、商品與影片不變。詳見 docs/bases-bedding-all-stores-20261112.json。
