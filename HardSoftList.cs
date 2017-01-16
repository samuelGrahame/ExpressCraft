using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
		protected List<IndexValue<T>> HardList = new List<IndexValue<T>>();
		public List<int> SoftList = new List<int>();

		private List<T> HardHardList = new List<T>();

		private int Limit;

		private int HardLength = 0;

		public IndexValue<T> GetIndexValueByHardListIndex(int index)
		{
			return HardList[index];
		}

		public T DefaultValue;

		public HardSoftList(T defaultValue, int limit = 10000)
		{
			DefaultValue = defaultValue;
			Limit = limit;
		}

		public void ClearAll()
		{
			HardHardList = new List<T>();
			HardList = new List<IndexValue<T>>();
			SoftList = new List<int>();
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
					HardList = new List<IndexValue<T>>();
					SoftList = new List<int>();
									
					int max = 0;				
					for(int i = 0; i < HardLength; i++)
					{
						if(Indexs[i] > max)
							max = Indexs[i];
					}
					int length = max + 1;
					HardHardList = new List<T>(length);

					if(length == Indexs.Length)
					{						
						for(int i = 0; i < HardLength; i++)
						{
							HardHardList.Add(value);
						}
					}
					else
					{
						for(int i = 0; i < length; i++)
						{
							HardHardList.Add(DefaultValue);
						}
						for(int i = 0; i < HardLength; i++)
						{
							HardHardList[Indexs[i]] = value;
						}
					}

					
				}
				else
				{
					HardHardList = new List<T>();
					HardLength = Indexs.Length;
					HardList = new List<IndexValue<T>>(HardLength);
					for(int i = 0; i < HardLength; i++)
					{
						HardList.Add(new IndexValue<T>(Indexs[i], value));
					}
					SoftList = new List<int>();
				}				
			}
		}

		public void ClearSoftList()
		{
			SoftList = new List<int>();
		}

		public void ClearAndAddOrSet(T value, int index, bool AddToSoftList = false)
		{
			HardHardList = new List<T>();
			HardList = new List<IndexValue<T>>();
			SoftList = new List<int>();
			HardLength = 0;
			AddOrSet(value, index, AddToSoftList);
		}

		protected IndexValue<T> GetHardOrSoftIndexValue(int index, bool AddToSoftList = false)
		{
			int length = SoftList.Count;
			for(int i = 0; i < length; i++)
			{
				var slI = SoftList[i];
				if(HardList[slI].Index == index)
				{
					return HardList[slI];
				}
			}			

			length = HardList.Count;

			for(int i = 0; i < length; i++)
			{
				var hli = HardList[i];
				if(hli.Index == index)
				{
					if(AddToSoftList)
					{
						SoftList.Add(i);						
					}
					return hli;
				}					
			}

			return null;
		}

		protected IndexValue<T> GetHardIndexValue(ref int index)
		{
			int length = HardList.Count;

			for(int i = 0; i < length; i++)
			{
				var hli = HardList[i];
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
				return HardHardList[index];
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
					int addDiff = (index + 1) - HardHardList.Count;					

					if(addDiff > 0)
					{
						T[] data = new T[addDiff];
						for(int i = 0; i < addDiff; i++)
						{
							data[i] = DefaultValue;
						}
						HardHardList.AddRange(data);
					}
					HardHardList.Add(value);

					HardLength = HardHardList.Count;
				}
				else
				{
					HardHardList[index] = value;
				}
				return;
			}

			int length = SoftList.Count;
			for(int i = 0; i < length; i++)
			{
				var hli = HardList[SoftList[i]];
				if(hli.Index == index)
				{
					hli.Value = value;
					return;
				}
			}

			int hindex = index;
			var hiv = GetHardIndexValue(ref hindex);
			if(hiv == null)			
				HardList.Add((hiv = new IndexValue<T>(index, value)));							
			else			
				hiv.Value = value;
						
			if(AddToSoftList)
				SoftList.Add(hindex);			
		}

		public void Remove(int index, bool OnlySoftList = false)
		{
			if(HardLength > Limit)
			{
				if(HardLength - 1 > Limit)
				{
					HardHardList[index] = DefaultValue;
				}else
				{				
					for(int i = 0; i < HardLength; i++)
					{
						if(i != index && !HardHardList[i].Equals(DefaultValue))
						{
							HardList.Add(new IndexValue<T>(i, HardHardList[i]));
						}
					}

					HardLength -= 1;
				}
			}else
			{
				int Length = SoftList.Count;
				for(int i = 0; i < Length; i++)
				{
					var sli = SoftList[i];
					if(HardList[sli].Index == index)
					{
						SoftList.RemoveAt(i);
						if(OnlySoftList)
							return;
						HardList.RemoveAt(sli);
						return;
					}
				}
				int length = HardList.Count;

				for(int i = 0; i < length; i++)
				{
					var hli = HardList[i];
					if(hli.Index == index)
					{
						HardList.RemoveAt(i);
						return;
					}
				}
			}			
		}
	}	
}
