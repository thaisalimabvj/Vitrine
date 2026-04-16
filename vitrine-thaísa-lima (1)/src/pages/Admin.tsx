import React, { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User, createUserWithEmailAndPassword } from 'firebase/auth';
import { addProduct, updateProduct, deleteProduct, subscribeToProducts } from '../services/productService';
import { Product } from '../components/ProductCard';
import { motion } from 'motion/react';
import { Plus, Trash2, Edit2, LogOut, ExternalLink, Save, X } from 'lucide-react';

const ADMIN_EMAIL = 'thaisalima.ofertas@gmail.com';
const AFFILIATE_TAG = 'thayofertas0f-20';

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    opinion: '',
    price: '',
    image: '',
    amazonUrl: '',
    rating: 5
  });

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });

    const unsubscribeProducts = subscribeToProducts((data) => {
      setProducts(data);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeProducts();
    };
  }, []);

  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegistering) {
        if (email !== ADMIN_EMAIL) {
          setError('Apenas o e-mail da Thay pode ser cadastrado como administrador.');
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Conta criada com sucesso! Você já pode gerenciar seus produtos.');
        setIsRegistering(false);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        setError('Usuário não encontrado. Deseja criar sua conta de administrador?');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('O login por E-mail/Senha não está ativado no Console do Firebase.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Senha incorreta.');
      } else {
        setError('Falha na operação: ' + err.message);
      }
      console.error(err);
    }
  };

  const handleLogout = () => signOut(auth);

  const formatAmazonUrl = (url: string) => {
    if (!url) return '';
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('amazon.com')) {
        urlObj.searchParams.set('tag', AFFILIATE_TAG);
        return urlObj.toString();
      }
      return url;
    } catch {
      return url;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      amazonUrl: formatAmazonUrl(formData.amazonUrl)
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id.toString(), finalData);
      } else {
        await addProduct(finalData as any);
      }
      resetForm();
      alert('Produto salvo com sucesso!');
    } catch (err: any) {
      console.error(err);
      try {
        const errorData = JSON.parse(err.message);
        if (errorData.error.toLowerCase().includes('permission')) {
          alert('Erro de permissão: Certifique-se de estar logada com o e-mail correto (thaisalima.ofertas@gmail.com).');
        } else {
          alert('Erro ao salvar: ' + errorData.error);
        }
      } catch {
        alert('Erro ao salvar produto. Verifique a conexão ou se o link do produto é da Amazon Brasil.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      opinion: '',
      price: '',
      image: '',
      amazonUrl: '',
      rating: 5
    });
    setEditingProduct(null);
    setIsFormOpen(false);
  };

  const handleEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      title: p.title,
      description: p.description,
      opinion: p.opinion,
      price: p.price,
      image: p.image,
      amazonUrl: p.amazonUrl,
      rating: p.rating
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await deleteProduct(id);
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <div className="p-20 text-center">Carregando...</div>;

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="max-w-md mx-auto py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 border border-gray-100 shadow-sm"
        >
          <h1 className="font-display text-4xl italic mb-8 border-b-2 border-brand-primary inline-block">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[11px] uppercase tracking-widest font-bold mb-2 text-gray-400">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-brand-bg/30 border-b border-gray-200 py-3 font-sans outline-none focus:border-brand-primary"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest font-bold mb-2 text-gray-400">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-brand-bg/30 border-b border-gray-200 py-3 font-sans outline-none focus:border-brand-primary"
                required
              />
            </div>
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button className="w-full bg-ink text-white py-4 font-sans text-xs font-bold uppercase tracking-widest hover:bg-brand-primary transition-colors">
              {isRegistering ? 'Criar Conta de Admin' : 'Entrar'}
            </button>
            <button 
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="w-full text-[10px] text-muted hover:text-brand-primary uppercase font-bold tracking-widest mt-4"
            >
              {isRegistering ? 'Já tenho uma conta' : 'Primeiro acesso? Crie sua conta'}
            </button>
          </form>
          <div className="mt-8 pt-8 border-t border-gray-50 text-[10px] text-gray-400">
            Acesso exclusivo para Vitrine Thaísa Lima.
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-12">
      <header className="flex justify-between items-center mb-12 border-b border-gray-100 pb-10">
        <div>
          <h1 className="font-display text-4xl italic text-ink mb-2 tracking-tight">Painel Administrativo</h1>
          <p className="text-sm text-muted">Gerencie seus achadinhos da Amazon</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => { resetForm(); setIsFormOpen(true); }}
            className="bg-ink text-white px-6 py-3 rounded-full flex items-center space-x-2 text-xs font-bold uppercase tracking-widest hover:bg-brand-primary"
          >
            <Plus size={16} />
            <span>Novo Produto</span>
          </button>
          <button onClick={handleLogout} className="text-muted hover:text-ink"><LogOut size={20} /></button>
        </div>
      </header>

      {isFormOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-ink/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-white w-full max-w-2xl p-8 lg:p-12 shadow-2xl relative"
          >
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-ink"
            >
              <X size={24} />
            </button>
            
            <h2 className="font-display text-3xl italic mb-10 border-b-2 border-brand-primary inline-block">
              {editingProduct ? 'Editar Produto' : 'Adicionar Achadinho'}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <label className="block text-[11px] uppercase tracking-widest font-bold mb-2 text-gray-400">Título do Produto</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border-b border-gray-100 py-3 font-sans outline-none focus:border-brand-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-widest font-bold mb-2 text-gray-400">Preço (Ex: R$ 59,90)</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full border-b border-gray-100 py-3 font-sans outline-none focus:border-brand-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-widest font-bold mb-2 text-gray-400">Avaliação (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  className="w-full border-b border-gray-100 py-3 font-sans outline-none focus:border-brand-primary"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[11px] uppercase tracking-widest font-bold mb-2 text-gray-400">Descrição Curta</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border-b border-gray-100 py-3 font-sans outline-none focus:border-brand-primary"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[11px] uppercase tracking-widest font-bold mb-2 text-gray-400">Link Amazon</label>
                <input
                  type="url"
                  value={formData.amazonUrl}
                  onChange={(e) => setFormData({ ...formData, amazonUrl: e.target.value })}
                  placeholder="https://www.amazon.com.br/..."
                  className="w-full border-b border-gray-100 py-3 font-sans outline-none focus:border-brand-primary"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[11px] uppercase tracking-widest font-bold mb-2 text-gray-400">URL da Imagem</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full border-b border-gray-100 py-3 font-sans outline-none focus:border-brand-primary"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[11px] uppercase tracking-widest font-bold mb-2 text-gray-400">Minha Opinião (Itálico)</label>
                <textarea
                  value={formData.opinion}
                  onChange={(e) => setFormData({ ...formData, opinion: e.target.value })}
                  className="w-full bg-brand-bg/30 p-4 font-serif italic outline-none focus:ring-1 focus:ring-brand-primary resize-none"
                  rows={3}
                  required
                ></textarea>
              </div>

              <div className="md:col-span-2 pt-6">
                <button className="w-full bg-ink text-white py-4 font-sans text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-brand-primary transition-colors">
                  <Save size={18} />
                  <span>{editingProduct ? 'Atualizar Produto' : 'Publicar Achadinho'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white border border-gray-100 p-4 flex flex-col justify-between group">
            <div>
              <div className="aspect-square mb-4 overflow-hidden relative">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-ink/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                  <button onClick={() => handleEdit(p)} className="p-3 bg-white text-ink rounded-full hover:bg-brand-primary hover:text-white transition-all">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(p.id.toString())} className="p-3 bg-white text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <h3 className="font-sans font-bold text-sm mb-1">{p.title}</h3>
              <p className="text-brand-primary font-bold text-xs">{p.price}</p>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-100 rounded-lg">
            <p className="text-muted font-serif italic">Nenhum produto cadastrado ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
