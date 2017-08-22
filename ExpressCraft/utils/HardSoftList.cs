using System.Collections.Generic;

namespace ExpressCraft
{
    public class IndexValue<T>
    {
        public readonly int Index;
        public T Value;

        public IndexValue(int index, T value)
        {
            Index = index;
            Value = value;
        }
    }

    public class HardSoftList<T>
    {
        private List<T> _hhl = new List<T>();
        protected List<IndexValue<T>> _hl = new List<IndexValue<T>>();
        public List<int> SL = new List<int>();

        private int Limit;

        private int HardLength = 0;

        public IndexValue<T> GetIndexValueByHardListIndex(int index)
        {
            return _hl[index];
        }

        public T DefaultValue;

        public HardSoftList(T defaultValue, int limit = 10000)
        {
            DefaultValue = defaultValue;
            Limit = limit;
        }

        public void ClearAll()
        {
            _hhl = new List<T>();
            _hl = new List<IndexValue<T>>();
            SL = new List<int>();
            HardLength = 0;
        }

        public void ClearAllSetHardRange(T value, params int[] Indexs)
        {
            HardLength = 0;
            if(Indexs == null || Indexs.Length == 0)
                ClearAll();
            else
            {
                if(Indexs.Length > Limit)
                {
                    HardLength = Indexs.Length;
                    _hl = new List<IndexValue<T>>();
                    SL = new List<int>();

                    int max = 0;
                    for(int i = 0; i < HardLength; i++)
                    {
                        if(Indexs[i] > max)
                            max = Indexs[i];
                    }
                    int length = max + 1;
                    _hhl = new List<T>(length);

                    if(length == Indexs.Length)
                    {
                        for(int i = 0; i < HardLength; i++)
                        {
                            _hhl.Add(value);
                        }
                    }
                    else
                    {
                        for(int i = 0; i < length; i++)
                        {
                            _hhl.Add(DefaultValue);
                        }
                        for(int i = 0; i < HardLength; i++)
                        {
                            _hhl[Indexs[i]] = value;
                        }
                    }
                }
                else
                {
                    _hhl = new List<T>();
                    HardLength = Indexs.Length;
                    _hl = new List<IndexValue<T>>(HardLength);
                    for(int i = 0; i < HardLength; i++)
                    {
                        _hl.Add(new IndexValue<T>(Indexs[i], value));
                    }
                    SL = new List<int>();
                }
            }
        }

        public void ClearSoftList()
        {
            SL = new List<int>();
        }

        public void ClearAndAddOrSet(T value, int index, bool AddToSoftList = false)
        {
            _hhl = new List<T>();
            _hl = new List<IndexValue<T>>();
            SL = new List<int>();
            HardLength = 0;
            AddOrSet(value, index, AddToSoftList);
        }

        protected IndexValue<T> GetHardOrSoftIndexValue(int index, bool AddToSoftList = false)
        {
            int length = SL.Count;
            for(int i = 0; i < length; i++)
            {
                var slI = SL[i];
                if(_hl[slI].Index == index)
                {
                    return _hl[slI];
                }
            }

            length = _hl.Count;

            for(int i = 0; i < length; i++)
            {
                var hli = _hl[i];
                if(hli.Index == index)
                {
                    if(AddToSoftList)
                    {
                        SL.Add(i);
                    }
                    return hli;
                }
            }

            return null;
        }

        protected IndexValue<T> GetHardIndexValue(ref int index)
        {
            int length = _hl.Count;

            for(int i = 0; i < length; i++)
            {
                var hli = _hl[i];
                if(hli.Index == index)
                {
                    index = i;
                    return hli;
                }
            }
            index = length;

            return null;
        }

        public T GetValue(int index, bool AddToSoftList = false)
        {
            if(HardLength > Limit)
            {
                return _hhl[index];
            }
            var hiv = GetHardOrSoftIndexValue(index, AddToSoftList);
            if(hiv == null)
                return DefaultValue;
            return hiv.Value;
        }

        public int GetIndex(int index)
        {
            if(HardLength > Limit)
            {
                return index;
            }

            var hiv = GetHardOrSoftIndexValue(index);
            if(hiv == null)
                return -1;
            return hiv.Index;
        }

        public void AddOrSet(T value, int index, bool AddToSoftList = false)
        {
            if(HardLength > Limit)
            {
                if(index >= HardLength)
                {
                    int addDiff = (index + 1) - _hhl.Count;
                    if(addDiff > 0)
                    {
                        T[] data = new T[addDiff];
                        for(int i = 0; i < addDiff; i++)
                        {
                            data[i] = DefaultValue;
                        }
                        _hhl.AddRange(data);
                    }
                    _hhl.Add(value);
                    HardLength = _hhl.Count;
                }
                else
                {
                    _hhl[index] = value;
                }
                return;
            }

            int length = SL.Count;
            for(int i = 0; i < length; i++)
            {
                var hli = _hl[SL[i]];
                if(hli.Index == index)
                {
                    hli.Value = value;
                    return;
                }
            }

            int hindex = index;
            var hiv = GetHardIndexValue(ref hindex);
            if(hiv == null)
                _hl.Add((hiv = new IndexValue<T>(index, value)));
            else
                hiv.Value = value;

            if(AddToSoftList)
                SL.Add(hindex);
        }

        public void Remove(int index, bool OnlySoftList = false)
        {
            if(HardLength > Limit)
            {
                if(HardLength - 1 > Limit)
                {
                    _hhl[index] = DefaultValue;
                }
                else
                {
                    for(int i = 0; i < HardLength; i++)
                    {
                        if(i != index && !_hhl[i].Equals(DefaultValue))
                        {
                            _hl.Add(new IndexValue<T>(i, _hhl[i]));
                        }
                    }

                    HardLength -= 1;
                }
            }
            else
            {
                int Length = SL.Count;
                for(int i = 0; i < Length; i++)
                {
                    var sli = SL[i];
                    if(_hl[sli].Index == index)
                    {
                        SL.RemoveAt(i);
                        if(OnlySoftList)
                            return;
                        _hl.RemoveAt(sli);
                        return;
                    }
                }
                int length = _hl.Count;

                for(int i = 0; i < length; i++)
                {
                    var hli = _hl[i];
                    if(hli.Index == index)
                    {
                        _hl.RemoveAt(i);
                        return;
                    }
                }
            }
        }
    }
}