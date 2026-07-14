/**
 * Máscara monetária BR por centavos (digitar 4000 → 40,00).
 * Script clássico (sem module) para aplicar mesmo se outros JS falharem.
 */
(function () {
  function onlyDigits(value) {
    return String(value || '').replace(/\D/g, '').slice(0, 15);
  }

  function formatDigits(digits) {
    if (!digits) return '';
    var cents = parseInt(digits, 10);
    if (isNaN(cents)) return '';
    return (cents / 100).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function applyMask(input) {
    var digits = onlyDigits(input.value);
    var formatted = formatDigits(digits);
    if (input.value !== formatted) {
      input.value = formatted;
    }
    try {
      var len = input.value.length;
      input.setSelectionRange(len, len);
    } catch (e) {
      /* ignore */
    }
  }

  function bindInput(input) {
    if (input.getAttribute('data-currency-bound') === '1') return;
    input.setAttribute('data-currency-bound', '1');
    input.setAttribute('inputmode', 'numeric');
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('enterkeyhint', 'done');

    input.addEventListener('input', function () {
      applyMask(input);
    });

    input.addEventListener('paste', function () {
      setTimeout(function () {
        applyMask(input);
      }, 0);
    });

    input.addEventListener('blur', function () {
      if (!input.value.trim()) return;
      applyMask(input);
    });

    // Se o browser restaurar valor cru, formata na carga
    if (input.value && onlyDigits(input.value) === input.value.replace(/\s/g, '')) {
      applyMask(input);
    }
  }

  function bindAll(root) {
    var scope = root || document;
    var nodes = scope.querySelectorAll('input[data-currency], input.js-currency');
    for (var i = 0; i < nodes.length; i++) {
      bindInput(nodes[i]);
    }
  }

  window.CltCurrencyMask = {
    formatDigits: formatDigits,
    applyMask: applyMask,
    bindAll: bindAll,
  };

  function boot() {
    bindAll(document);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
