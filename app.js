'use strict';

(() => {
  const STORAGE_KEY = 'mizan-budget-data-v1';
  const LANGUAGE_KEY = 'mizan-budget-language-v1';
  const DEFAULT_MONTHLY_BUDGET = 3000;
  const CATEGORY_KEYS = ['food', 'transport', 'housing', 'study', 'phone', 'leisure', 'other'];
  const CATEGORY_ICONS = { food: '🥕', transport: '🚌', housing: '🏠', study: '📚', phone: '📱', leisure: '☕', other: '◦' };

  const copy = {
    fr: {
      pageTitle: 'Mizan — Budget personnel au Maroc', brandSubtitle: 'Budget personnel · Maroc', privateBadge: 'Tes données restent sur cet appareil',
      heroEyebrow: 'TON ARGENT, À TON RYTHME', heroTitle: 'Un budget plus clair.<br><span>Moins de charge mentale.</span>', heroText: 'Suis tes dépenses en dirhams, garde le contrôle de ton mois et fais tes comptes sans créer de compte.', offlineBadge: 'Fonctionne hors ligne', localBadge: 'Privé par défaut', artSticker: 'Ça avance',
      overviewEyebrow: 'VUE D’ENSEMBLE', monthHeading: 'Ton mois', monthLabel: 'Mois', exportCsv: 'Exporter CSV',
      budgetLabel: 'Budget prévu', editBudget: 'Modifier', spentLabel: 'Dépensé', spentFoot: 'Sur le mois sélectionné', leftLabel: 'Encore disponible',
      categoriesEyebrow: 'OÙ PART TON ARGENT', categoriesTitle: 'Par catégorie', categoriesSubtitle: 'Répartition de tes dépenses ce mois-ci.', activityEyebrow: 'TES MOUVEMENTS', transactionsTitle: 'Dépenses récentes', filterLabel: 'Filtrer par catégorie', allCategories: 'Toutes les catégories',
      addEyebrow: 'À NOTER', addTitle: 'Ajouter une dépense', addSubtitle: 'Ça prend quelques secondes.', amountLabel: 'Montant', categoryLabel: 'Catégorie', noteLabel: 'Détail <span class="optional-label">(facultatif)</span>', notePlaceholder: 'Ex. Courses de la semaine', dateLabel: 'Date', submitExpense: 'Enregistrer la dépense',
      privacyTitle: 'Tes données, chez toi.', privacyText: 'Mizan ne crée pas de compte et n’envoie pas tes dépenses sur un serveur. Tes données restent dans le stockage de ce navigateur.',
      toolsEyebrow: 'TES DONNÉES', toolsTitle: 'Sauvegarder ou exporter', toolsSubtitle: 'Garde une copie de tes dépenses ou repars à zéro.', backupJson: 'Télécharger une sauvegarde', restoreJson: 'Restaurer une sauvegarde', clearData: 'Effacer mes données', footerText: 'Un outil indépendant, gratuit et open source. Pas de compte, pas de suivi.',
      budgetDialogEyebrow: 'TON OBJECTIF', budgetDialogTitle: 'Fixe ton budget du mois', budgetDialogText: 'Tu peux le modifier à tout moment. Le montant est enregistré seulement sur cet appareil.', budgetDialogLabel: 'Budget mensuel (MAD)', cancel: 'Annuler', saveBudget: 'Enregistrer',
      monthProgress: '{percent} % du budget utilisé', overBudget: 'Budget dépassé de {amount}', remainingOkay: 'À dépenser sans dépasser ton budget', remainingOver: 'Tu as dépassé ton budget mensuel', emptyCategories: 'Aucune dépense pour ce mois.', emptyTransactions: 'Rien à afficher pour ce mois.', emptyTransactionsHint: 'Ajoute une dépense avec le formulaire.', noFilteredTransactions: 'Aucune dépense dans cette catégorie.', transactionCount: '{count} dépense(s) enregistrée(s)', filteredCount: '{shown} sur {total} dépense(s)',
      deleteTransaction: 'Supprimer cette dépense', confirmDelete: 'Supprimer cette dépense ?', confirmClear: 'Effacer toutes les dépenses et tous les budgets enregistrés sur cet appareil ?', confirmImport: 'Remplacer les données actuelles par cette sauvegarde ?',
      addedToast: 'Dépense enregistrée.', deletedToast: 'Dépense supprimée.', budgetSavedToast: 'Budget mis à jour.', csvToast: 'Fichier CSV téléchargé.', backupToast: 'Sauvegarde téléchargée.', importToast: 'Sauvegarde restaurée.', clearedToast: 'Données effacées.', invalidAmount: 'Entre un montant supérieur à zéro.', invalidDate: 'Choisis une date valide.', saveError: 'Impossible d’enregistrer ici. Vérifie le stockage du navigateur.', importError: 'Ce fichier ne semble pas être une sauvegarde Mizan valide.', storageWarning: 'Le navigateur ne permet pas le stockage local : tes données ne seront pas conservées après fermeture.',
      categoryNames: { food: 'Alimentation', transport: 'Transport', housing: 'Logement', study: 'Études', phone: 'Téléphone', leisure: 'Sorties', other: 'Autre' },
      languageLabel: 'Passer en arabe', filterAll: 'Toutes les catégories', categoryShare: '{percent} % des dépenses'
    },
    ar: {
      pageTitle: 'ميزان — ميزانية شخصية في المغرب', brandSubtitle: 'ميزانية شخصية · المغرب', privateBadge: 'بياناتك تبقى على هذا الجهاز',
      heroEyebrow: 'فلوسك، على راحتك', heroTitle: 'ميزانية أوضح.<br><span>ضغط أقل.</span>', heroText: 'تابع مصاريفك بالدرهم، نظّم ميزانيتك الشهرية وسجّل حساباتك بلا ما تفتح حساب.', offlineBadge: 'يعمل بلا إنترنت', localBadge: 'الخصوصية أولاً', artSticker: 'خطوة بخطوة',
      overviewEyebrow: 'نظرة عامة', monthHeading: 'هذا الشهر', monthLabel: 'الشهر', exportCsv: 'تصدير CSV',
      budgetLabel: 'الميزانية المحددة', editBudget: 'تعديل', spentLabel: 'المصاريف', spentFoot: 'خلال الشهر المختار', leftLabel: 'المبلغ المتبقي',
      categoriesEyebrow: 'فين كتمشي فلوسك', categoriesTitle: 'حسب الفئة', categoriesSubtitle: 'توزيع مصاريفك لهذا الشهر.', activityEyebrow: 'الحركات ديالك', transactionsTitle: 'آخر المصاريف', filterLabel: 'تصفية حسب الفئة', allCategories: 'جميع الفئات',
      addEyebrow: 'سجّلها', addTitle: 'أضف مصروفاً', addSubtitle: 'الأمر لا يستغرق سوى ثوانٍ.', amountLabel: 'المبلغ', categoryLabel: 'الفئة', noteLabel: 'التفاصيل <span class="optional-label">(اختياري)</span>', notePlaceholder: 'مثال: مشتريات الأسبوع', dateLabel: 'التاريخ', submitExpense: 'حفظ المصروف',
      privacyTitle: 'بياناتك عندك.', privacyText: 'ميزان لا ينشئ حساباً ولا يرسل مصاريفك إلى خادم. تبقى البيانات في تخزين هذا المتصفح.',
      toolsEyebrow: 'بياناتك', toolsTitle: 'حفظ أو تصدير', toolsSubtitle: 'احتفظ بنسخة من مصاريفك أو ابدأ من جديد.', backupJson: 'تحميل نسخة احتياطية', restoreJson: 'استعادة نسخة', clearData: 'حذف بياناتي', footerText: 'أداة مستقلة ومجانية ومفتوحة المصدر. بلا حسابات وبلا تتبّع.',
      budgetDialogEyebrow: 'هدفك', budgetDialogTitle: 'حدّد ميزانيتك للشهر', budgetDialogText: 'يمكنك تعديلها في أي وقت. يتم حفظ المبلغ على هذا الجهاز فقط.', budgetDialogLabel: 'الميزانية الشهرية (MAD)', cancel: 'إلغاء', saveBudget: 'حفظ',
      monthProgress: 'تم استخدام {percent}٪ من الميزانية', overBudget: 'تجاوزت الميزانية بـ {amount}', remainingOkay: 'المبلغ المتاح قبل تجاوز الميزانية', remainingOver: 'لقد تجاوزت ميزانيتك الشهرية', emptyCategories: 'لا توجد مصاريف لهذا الشهر.', emptyTransactions: 'لا توجد مصاريف لعرضها.', emptyTransactionsHint: 'أضف مصروفاً من الاستمارة.', noFilteredTransactions: 'لا توجد مصاريف في هذه الفئة.', transactionCount: 'تم تسجيل {count} مصروفاً', filteredCount: '{shown} من أصل {total} مصروف',
      deleteTransaction: 'حذف هذا المصروف', confirmDelete: 'هل تريد حذف هذا المصروف؟', confirmClear: 'هل تريد حذف جميع المصاريف والميزانيات المحفوظة على هذا الجهاز؟', confirmImport: 'استبدال البيانات الحالية بهذه النسخة الاحتياطية؟',
      addedToast: 'تم حفظ المصروف.', deletedToast: 'تم حذف المصروف.', budgetSavedToast: 'تم تحديث الميزانية.', csvToast: 'تم تحميل ملف CSV.', backupToast: 'تم تحميل النسخة الاحتياطية.', importToast: 'تمت استعادة النسخة.', clearedToast: 'تم حذف البيانات.', invalidAmount: 'أدخل مبلغاً أكبر من صفر.', invalidDate: 'اختر تاريخاً صحيحاً.', saveError: 'تعذر الحفظ هنا. تحقق من تخزين المتصفح.', importError: 'يبدو أن هذا الملف ليس نسخة احتياطية صالحة من ميزان.', storageWarning: 'المتصفح لا يسمح بالتخزين المحلي؛ لن تبقى البيانات بعد إغلاقه.',
      categoryNames: { food: 'الطعام', transport: 'النقل', housing: 'السكن', study: 'الدراسة', phone: 'الهاتف', leisure: 'الترفيه', other: 'أخرى' },
      languageLabel: 'التبديل إلى الفرنسية', filterAll: 'جميع الفئات', categoryShare: '{percent}٪ من المصاريف'
    }
  };

  const today = localDateString(new Date());
  let language = loadLanguage();
  let state = loadState();
  let toastTimer = null;

  const els = {
    month: document.getElementById('monthPicker'),
    monthName: document.getElementById('selectedMonthLabel'),
    budgetAmount: document.getElementById('budgetAmount'),
    spentAmount: document.getElementById('spentAmount'),
    remainingAmount: document.getElementById('remainingAmount'),
    remainingFoot: document.getElementById('remainingFoot'),
    progress: document.getElementById('budgetProgress'),
    progressFill: document.getElementById('budgetProgressFill'),
    progressText: document.getElementById('budgetProgressText'),
    categories: document.getElementById('categoryBars'),
    transactions: document.getElementById('transactionList'),
    transactionSubtitle: document.getElementById('transactionsSubtitle'),
    categoryFilter: document.getElementById('categoryFilter'),
    categoryInput: document.getElementById('categoryInput'),
    dateInput: document.getElementById('dateInput'),
    amountInput: document.getElementById('amountInput'),
    noteInput: document.getElementById('noteInput'),
    form: document.getElementById('expenseForm'),
    formMessage: document.getElementById('formMessage'),
    toast: document.getElementById('toast'),
    languageToggle: document.getElementById('languageToggle'),
    budgetDialog: document.getElementById('budgetDialog'),
    budgetForm: document.getElementById('budgetForm'),
    budgetInput: document.getElementById('budgetInput'),
    importInput: document.getElementById('importJsonInput')
  };

  function t(key) { return copy[language][key]; }
  function localDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  function monthKey(date = new Date()) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; }
  function newId() {
    if (globalThis.crypto && typeof globalThis.crypto.randomUUID === 'function') return globalThis.crypto.randomUUID();
    return `mizan-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
  function loadLanguage() {
    try { return localStorage.getItem(LANGUAGE_KEY) === 'ar' ? 'ar' : 'fr'; } catch { return 'fr'; }
  }
  function loadState() {
    const fallback = { version: 1, expenses: [], budgets: {} };
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return fallback;
      return normaliseState(JSON.parse(raw));
    } catch { return fallback; }
  }
  function normaliseState(data) {
    const clean = { version: 1, expenses: [], budgets: {} };
    if (!data || typeof data !== 'object') return clean;
    if (Array.isArray(data.expenses)) {
      clean.expenses = data.expenses.map(sanitiseExpense).filter(Boolean);
    }
    if (data.budgets && typeof data.budgets === 'object' && !Array.isArray(data.budgets)) {
      for (const [key, value] of Object.entries(data.budgets)) {
        const amount = Number(value);
        if (/^\d{4}-\d{2}$/.test(key) && Number.isFinite(amount) && amount >= 0 && amount <= 100000000) clean.budgets[key] = Math.round(amount * 100) / 100;
      }
    }
    return clean;
  }
  function sanitiseExpense(item) {
    if (!item || typeof item !== 'object') return null;
    const amount = Number(item.amount);
    const date = String(item.date || '');
    const category = String(item.category || '');
    if (!Number.isFinite(amount) || amount <= 0 || amount > 100000000 || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !CATEGORY_KEYS.includes(category)) return null;
    const rawId = typeof item.id === 'string' && /^[\w-]{1,80}$/.test(item.id) ? item.id : newId();
    const createdAt = Number.isFinite(Number(item.createdAt)) ? Number(item.createdAt) : 0;
    return { id: rawId, amount: Math.round(amount * 100) / 100, category, date, note: String(item.note || '').slice(0, 100), createdAt };
  }
  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return true;
    } catch {
      showToast(t('saveError'), true);
      return false;
    }
  }
  function safeText(value) {
    return String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }
  function formatMoney(amount) {
    try {
      return new Intl.NumberFormat(language === 'ar' ? 'ar-MA' : 'fr-MA', { style: 'currency', currency: 'MAD', maximumFractionDigits: 2 }).format(amount);
    } catch { return `${Number(amount).toFixed(2)} MAD`; }
  }
  function formatDate(dateString) {
    const date = new Date(`${dateString}T12:00:00`);
    if (Number.isNaN(date.getTime())) return dateString;
    try { return new Intl.DateTimeFormat(language === 'ar' ? 'ar-MA' : 'fr-MA', { day: 'numeric', month: 'short', year: 'numeric' }).format(date); }
    catch { return dateString; }
  }
  function formatMonth(monthString) {
    const [year, month] = monthString.split('-').map(Number);
    const date = new Date(year, month - 1, 1);
    try { return new Intl.DateTimeFormat(language === 'ar' ? 'ar-MA' : 'fr-MA', { month: 'long', year: 'numeric' }).format(date); }
    catch { return monthString; }
  }
  function replaceTokens(text, tokens) {
    return Object.entries(tokens).reduce((result, [key, value]) => result.replaceAll(`{${key}}`, String(value)), text);
  }
  function getBudget(key = els.month.value || monthKey()) {
    const value = state.budgets[key];
    return Number.isFinite(value) ? value : DEFAULT_MONTHLY_BUDGET;
  }
  function getMonthExpenses(key = els.month.value || monthKey()) {
    return state.expenses.filter(item => item.date.slice(0, 7) === key);
  }
  function showToast(message, isError = false) {
    if (!els.toast) return;
    window.clearTimeout(toastTimer);
    els.toast.textContent = message;
    els.toast.classList.toggle('is-error', isError);
    els.toast.classList.add('is-visible');
    toastTimer = window.setTimeout(() => els.toast.classList.remove('is-visible'), 2700);
  }
  function setLanguage(nextLanguage) {
    language = nextLanguage;
    try { localStorage.setItem(LANGUAGE_KEY, language); } catch { /* Language preference is optional. */ }
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.title = t('pageTitle');
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.dataset.i18n;
      const value = t(key);
      if (value !== undefined) element.innerHTML = value;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const value = t(element.dataset.i18nPlaceholder);
      if (value !== undefined) element.setAttribute('placeholder', value);
    });
    document.querySelectorAll('[data-category]').forEach(option => {
      option.textContent = copy[language].categoryNames[option.dataset.category] || option.dataset.category;
    });
    els.languageToggle.textContent = language === 'fr' ? 'العربية' : 'Français';
    els.languageToggle.setAttribute('aria-label', t('languageLabel'));
    fillFilterOptions();
    renderAll();
  }
  function renderAll() {
    const key = els.month.value || monthKey();
    const expenses = getMonthExpenses(key);
    const budget = getBudget(key);
    const spent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const remaining = budget - spent;
    const percent = budget > 0 ? Math.round(spent / budget * 100) : (spent > 0 ? 100 : 0);
    els.monthName.textContent = formatMonth(key);
    els.budgetAmount.textContent = formatMoney(budget);
    els.spentAmount.textContent = formatMoney(spent);
    els.remainingAmount.textContent = formatMoney(remaining);
    els.remainingAmount.classList.toggle('amount-over', remaining < 0);
    els.remainingFoot.textContent = remaining >= 0 ? t('remainingOkay') : t('remainingOver');
    const progressWidth = budget > 0 ? Math.min(100, Math.max(0, spent / budget * 100)) : (spent > 0 ? 100 : 0);
    els.progressFill.style.width = `${progressWidth}%`;
    els.progressFill.classList.toggle('over', spent > budget && budget > 0);
    els.progress.setAttribute('aria-valuenow', String(Math.min(100, percent)));
    els.progress.setAttribute('aria-valuetext', budget > 0 ? replaceTokens(t('monthProgress'), { percent }) : formatMoney(spent));
    els.progressText.textContent = spent > budget && budget > 0
      ? replaceTokens(t('overBudget'), { amount: formatMoney(spent - budget) })
      : replaceTokens(t('monthProgress'), { percent });
    renderCategoryBars(expenses, spent);
    renderTransactions(expenses);
  }
  function renderCategoryBars(expenses, totalSpent) {
    if (!totalSpent) {
      els.categories.innerHTML = `<div class="empty-state"><span class="empty-state-icon" aria-hidden="true">🌿</span><p>${safeText(t('emptyCategories'))}</p></div>`;
      return;
    }
    const totals = Object.fromEntries(CATEGORY_KEYS.map(key => [key, 0]));
    expenses.forEach(item => { totals[item.category] += item.amount; });
    const entries = CATEGORY_KEYS.filter(key => totals[key] > 0).sort((a, b) => totals[b] - totals[a]);
    els.categories.innerHTML = entries.map(key => {
      const amount = totals[key];
      const share = Math.round(amount / totalSpent * 100);
      const label = copy[language].categoryNames[key];
      return `<div class="category-row"><div class="category-heading"><span class="category-name"><span class="category-name-icon" aria-hidden="true">${CATEGORY_ICONS[key]}</span>${safeText(label)}</span><strong class="category-value">${safeText(formatMoney(amount))}</strong></div><div class="category-track" role="progressbar" aria-label="${safeText(label)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${share}"><span style="width:${share}%"></span></div></div>`;
    }).join('');
  }
  function renderTransactions(expenses) {
    const selectedCategory = els.categoryFilter.value || 'all';
    const visible = expenses.filter(item => selectedCategory === 'all' || item.category === selectedCategory)
      .sort((a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt);
    els.transactionSubtitle.textContent = selectedCategory === 'all'
      ? replaceTokens(t('transactionCount'), { count: expenses.length })
      : replaceTokens(t('filteredCount'), { shown: visible.length, total: expenses.length });
    if (!visible.length) {
      const message = expenses.length ? t('noFilteredTransactions') : t('emptyTransactions');
      const hint = expenses.length ? '' : `<small>${safeText(t('emptyTransactionsHint'))}</small>`;
      els.transactions.innerHTML = `<div class="empty-state"><span class="empty-state-icon" aria-hidden="true">🧾</span><p>${safeText(message)}</p>${hint}</div>`;
      return;
    }
    els.transactions.innerHTML = visible.map(item => {
      const label = copy[language].categoryNames[item.category];
      const title = item.note.trim() || label;
      const deleteLabel = `${t('deleteTransaction')}: ${title}`;
      return `<article class="transaction-row"><span class="transaction-mark" aria-hidden="true">${CATEGORY_ICONS[item.category]}</span><div class="transaction-info"><p class="transaction-title">${safeText(title)}</p><span class="transaction-meta">${safeText(label)} · ${safeText(formatDate(item.date))}</span></div><div class="transaction-right"><strong class="transaction-amount">−${safeText(formatMoney(item.amount))}</strong><button class="delete-transaction" type="button" data-delete-id="${safeText(item.id)}" aria-label="${safeText(deleteLabel)}">×</button></div></article>`;
    }).join('');
  }
  function fillFilterOptions() {
    const previous = els.categoryFilter.value || 'all';
    els.categoryFilter.innerHTML = `<option value="all">${safeText(t('allCategories'))}</option>` + CATEGORY_KEYS.map(key => `<option value="${key}">${safeText(copy[language].categoryNames[key])}</option>`).join('');
    els.categoryFilter.value = previous === 'all' || CATEGORY_KEYS.includes(previous) ? previous : 'all';
  }
  function csvCell(value) {
    const text = String(value ?? '');
    return `"${text.replaceAll('"', '""')}"`;
  }
  function downloadFile(filename, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function exportCsv() {
    const headings = language === 'fr' ? ['Date', 'Montant MAD', 'Catégorie', 'Détail'] : ['التاريخ', 'المبلغ MAD', 'الفئة', 'التفاصيل'];
    const rows = state.expenses.slice().sort((a, b) => a.date.localeCompare(b.date)).map(item => [item.date, item.amount.toFixed(2), copy[language].categoryNames[item.category], item.note]);
    const csv = '\ufeff' + [headings, ...rows].map(row => row.map(csvCell).join(';')).join('\r\n');
    downloadFile(`mizan-depenses-${localDateString(new Date())}.csv`, csv, 'text/csv;charset=utf-8');
    showToast(t('csvToast'));
  }
  function exportJson() {
    const backup = { app: 'Mizan', version: 1, exportedAt: new Date().toISOString(), expenses: state.expenses, budgets: state.budgets };
    downloadFile(`mizan-sauvegarde-${localDateString(new Date())}.json`, JSON.stringify(backup, null, 2), 'application/json;charset=utf-8');
    showToast(t('backupToast'));
  }
  function addExpense(event) {
    event.preventDefault();
    els.formMessage.textContent = '';
    const amount = Number(els.amountInput.value);
    const category = els.categoryInput.value;
    const date = els.dateInput.value;
    if (!Number.isFinite(amount) || amount <= 0 || amount > 100000000) { els.formMessage.textContent = t('invalidAmount'); els.amountInput.focus(); return; }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(new Date(`${date}T12:00:00`).getTime())) { els.formMessage.textContent = t('invalidDate'); els.dateInput.focus(); return; }
    const item = { id: newId(), amount: Math.round(amount * 100) / 100, category: CATEGORY_KEYS.includes(category) ? category : 'other', date, note: els.noteInput.value.trim().slice(0, 100), createdAt: Date.now() };
    state.expenses.push(item);
    els.month.value = date.slice(0, 7);
    saveState();
    els.form.reset();
    els.dateInput.value = today;
    els.categoryInput.value = 'food';
    renderAll();
    showToast(t('addedToast'));
    els.amountInput.focus();
  }
  function deleteExpense(id) {
    const item = state.expenses.find(expense => expense.id === id);
    if (!item || !window.confirm(t('confirmDelete'))) return;
    state.expenses = state.expenses.filter(expense => expense.id !== id);
    saveState();
    renderAll();
    showToast(t('deletedToast'));
  }
  function openBudgetDialog() {
    els.budgetInput.value = String(getBudget());
    if (typeof els.budgetDialog.showModal === 'function') els.budgetDialog.showModal();
    else els.budgetDialog.setAttribute('open', '');
    els.budgetInput.focus();
  }
  function closeBudgetDialog() {
    if (typeof els.budgetDialog.close === 'function') els.budgetDialog.close();
    else els.budgetDialog.removeAttribute('open');
  }
  function saveBudget(event) {
    event.preventDefault();
    const amount = Number(els.budgetInput.value);
    if (!Number.isFinite(amount) || amount < 0 || amount > 100000000) return;
    state.budgets[els.month.value || monthKey()] = Math.round(amount * 100) / 100;
    saveState();
    closeBudgetDialog();
    renderAll();
    showToast(t('budgetSavedToast'));
  }
  async function importJsonFile(file) {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      if (!parsed || !Array.isArray(parsed.expenses) || typeof parsed !== 'object') throw new Error('Invalid backup shape');
      if (!window.confirm(t('confirmImport'))) return;
      state = normaliseState(parsed);
      saveState();
      renderAll();
      showToast(t('importToast'));
    } catch {
      showToast(t('importError'), true);
    } finally {
      els.importInput.value = '';
    }
  }

  els.month.value = monthKey();
  els.dateInput.value = today;
  fillFilterOptions();
  els.form.addEventListener('submit', addExpense);
  els.month.addEventListener('change', renderAll);
  els.categoryFilter.addEventListener('change', renderAll);
  els.languageToggle.addEventListener('click', () => setLanguage(language === 'fr' ? 'ar' : 'fr'));
  document.getElementById('editBudget').addEventListener('click', openBudgetDialog);
  document.getElementById('closeBudgetDialog').addEventListener('click', closeBudgetDialog);
  document.getElementById('cancelBudget').addEventListener('click', closeBudgetDialog);
  els.budgetForm.addEventListener('submit', saveBudget);
  els.budgetDialog.addEventListener('click', event => { if (event.target === els.budgetDialog) closeBudgetDialog(); });
  els.transactions.addEventListener('click', event => {
    const button = event.target.closest('[data-delete-id]');
    if (button) deleteExpense(button.dataset.deleteId);
  });
  document.getElementById('exportCsv').addEventListener('click', exportCsv);
  document.getElementById('exportJson').addEventListener('click', exportJson);
  document.getElementById('importJsonButton').addEventListener('click', () => els.importInput.click());
  els.importInput.addEventListener('change', event => importJsonFile(event.target.files && event.target.files[0]));
  document.getElementById('clearData').addEventListener('click', () => {
    if (!window.confirm(t('confirmClear'))) return;
    state = { version: 1, expenses: [], budgets: {} };
    saveState();
    renderAll();
    showToast(t('clearedToast'));
  });

  setLanguage(language);
  try {
    const probe = `${STORAGE_KEY}-probe`;
    localStorage.setItem(probe, '1');
    localStorage.removeItem(probe);
  } catch { showToast(t('storageWarning'), true); }
})();
