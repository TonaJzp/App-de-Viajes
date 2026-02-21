const categorias = [
    { value: 'Todos', label: 'Todos', icon: '🌍' },
    { value: 'Playa', label: 'Playa', icon: '🏖️' },
    { value: 'Montaña', label: 'Montaña', icon: '🏔️' },
    { value: 'Ciudad', label: 'Ciudad', icon: '🏙️' },
    { value: 'Cultural', label: 'Cultural', icon: '🏛️' },
    { value: 'Aventura', label: 'Aventura', icon: '⛺' },
];

export default function FiltroCategorias({ seleccionada, alSeleccionar }) {
    return (
        <div className="flex flex-wrap sm:flex-nowrap gap-2">
            {categorias.map((cat) => (
                <button
                    key={cat.value}
                    onClick={() => alSeleccionar(cat.value)}
                    className={`inline-flex items-center whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${seleccionada === cat.value
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300 hover:text-primary-600'
                        }`}
                >
                    <span className="mr-1.5">{cat.icon}</span>
                    {cat.label}
                </button>
            ))}
        </div>
    );
}
