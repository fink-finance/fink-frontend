# 🎨 Paleta de Cores - Fink

## Cores Principais

### Azul Fink (Primary)

- **HEX**: `#0055FF`
- **RGB**: `0 85 255`
- **HSL**: `220 100 50`
- **Uso**: Cor principal da marca, botões primários, links

### Verde Fink (Accent)

- **HEX**: `#6ADCC5`
- **RGB**: `106 220 197`
- **HSL**: `168 62 64`
- **Uso**: Destaques, ações positivas, sucesso

## Cores Secundárias

### Azul 2

- **HEX**: `#87A9FA`
- **RGB**: `135 169 250`
- **HSL**: `222 92 75`
- **Uso**: Backgrounds secundários, hover states

### Azul 3

- **HEX**: `#DBE5FF`
- **RGB**: `219 229 255`
- **HSL**: `223 100 93`
- **Uso**: Backgrounds suaves, estados inativos

### Verde 2

- **HEX**: `#A7EDE2`
- **RGB**: `167 237 226`
- **HSL**: `161 66 79`
- **Uso**: Backgrounds de sucesso, mensagens positivas

### Verde 3

- **HEX**: `#E4FAF7`
- **RGB**: `228 250 247`
- **HSL**: `172 69 94`
- **Uso**: Backgrounds muito suaves

## Cores Neutras

### Preto

- **HEX**: `#000000`
- **RGB**: `0 0 0`
- **Uso**: Textos principais, ícones

### Cinza 1

- **HEX**: `#9D9D9D`
- **RGB**: `157 157 157`
- **HSL**: `0 0 62`
- **Uso**: Textos secundários, ícones inativos

### Cinza 2

- **HEX**: `#D0D0D0`
- **RGB**: `208 208 208`
- **HSL**: `0 0 82`
- **Uso**: Bordas, divisores, inputs

## Mapeamento no Tailwind

```tsx
// Usar no código:
bg - primary; // Azul Fink
text - primary; // Azul Fink

bg - accent; // Verde Fink
text - accent; // Verde Fink

bg - secondary; // Azul 2
text - secondary; // Azul 2

bg - muted; // Cinza 1
text - muted; // Cinza 1

border - border; // Cinza 2
```

## Uso em Componentes

### Botões

```tsx
// Primário
<Button variant="default">      // Azul Fink

// Secundário
<Button variant="secondary">    // Azul 2

// Outline
<Button variant="outline">      // Border Cinza 2
```

### Cards

```tsx
// Background padrão: branco
<div className='bg-card border-border'>{/* Conteúdo */}</div>
```

### Textos

```tsx
<h1 className="text-foreground">  // Preto
<p className="text-muted">         // Cinza 1
```

## Gráficos (Charts)

As variáveis `--chart-1` a `--chart-5` estão mapeadas para:

1. **chart-1**: Azul Fink
2. **chart-2**: Verde Fink
3. **chart-3**: Azul 2
4. **chart-4**: Azul 3
5. **chart-5**: Verde 2
